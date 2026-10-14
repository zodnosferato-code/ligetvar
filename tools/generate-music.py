#!/usr/bin/env python3
"""Seamless instrumental loops for Ligetvár. No vocals. Original synthesis."""

from __future__ import annotations

import subprocess
import wave
from pathlib import Path

import numpy as np

SR = 44100
DUR = 36.0
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "music" if (ROOT / "public").is_dir() else ROOT / "music"


def midi(n: float) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


def lowpass(x: np.ndarray, cutoff: float, sr: int = SR) -> np.ndarray:
    rc = 1.0 / (2 * np.pi * cutoff)
    dt = 1.0 / sr
    a = dt / (rc + dt)
    y = np.empty_like(x)
    acc = 0.0
    for i, sample in enumerate(x):
        acc += a * (sample - acc)
        y[i] = acc
    return y


def highpass(x: np.ndarray, cutoff: float, sr: int = SR) -> np.ndarray:
    return x - lowpass(x, cutoff, sr)


def piano(freq: float, dur: float, vel: float = 0.5) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    env = np.exp(-t * 2.6) * (1 - np.exp(-t * 90))
    y = np.zeros(n)
    for k, amp in ((1, 1.0), (2, 0.32), (3, 0.16), (4, 0.07), (5, 0.03)):
        y += amp * np.sin(2 * np.pi * freq * k * t)
    hammer_n = min(n, int(0.025 * SR))
    ht = np.arange(hammer_n) / SR
    y[:hammer_n] += np.random.randn(hammer_n) * np.exp(-ht / 0.004) * 0.12
    return (y * env * vel).astype(np.float32)


def kalimba(freq: float, dur: float, vel: float = 0.45) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for ratio, amp, decay in ((1, 1.0, 4.5), (2.71, 0.45, 7), (5.15, 0.2, 10), (8.4, 0.08, 14)):
        y += amp * np.sin(2 * np.pi * freq * ratio * t) * np.exp(-t * decay)
    env = 1 - np.exp(-t * 120)
    return (y * env * vel).astype(np.float32)


def pad(freqs: list[float], n: int, level: float = 0.18) -> np.ndarray:
    t = np.arange(n) / SR
    y = np.zeros(n)
    for f in freqs:
        for det, pan_phase in ((-0.0035, 0.0), (0.0, 1.2), (0.0035, 2.4)):
            lfo = 0.82 + 0.18 * np.sin(2 * np.pi * t / 12 + pan_phase)
            y += lfo * np.sin(2 * np.pi * f * (1 + det) * t)
    y = lowpass(y / max(len(freqs), 1), 900)
    return (y * level).astype(np.float32)


def place(buf: np.ndarray, start: float, note: np.ndarray, pan: float = 0.0) -> None:
    i = int(start * SR)
    if i >= len(buf) or i < 0:
        return
    end = min(len(buf), i + len(note))
    chunk = note[: end - i]
    left = np.sqrt(0.5 * (1 - pan))
    right = np.sqrt(0.5 * (1 + pan))
    buf[i:end, 0] += chunk * left
    buf[i:end, 1] += chunk * right


def stereo_from_mono(mono: np.ndarray, width: float = 0.15) -> np.ndarray:
    delayed = np.concatenate([np.zeros(int(0.012 * SR)), mono])[: len(mono)]
    left = mono * (1 - width) + delayed * width
    right = mono * (1 - width) + np.concatenate([delayed[int(0.008 * SR) :], np.zeros(int(0.008 * SR))])[: len(mono)] * width
    return np.stack([left, right], axis=1)


def soft_kick(n_beats: int, every: float, n: int) -> np.ndarray:
    y = np.zeros(n)
    for i in range(n_beats):
        start = int(i * every * SR)
        length = int(0.28 * SR)
        if start >= n:
            break
        t = np.arange(min(length, n - start)) / SR
        freq = 78 * np.exp(-t * 14) + 42
        phase = 2 * np.pi * np.cumsum(freq) / SR
        body = np.sin(phase) * np.exp(-t * 10)
        y[start : start + len(t)] += body * 0.55
    return y


def shaker(every: float, n: int, level: float = 0.08) -> np.ndarray:
    y = np.zeros(n)
    i = 0
    burst = int(0.045 * SR)
    t0 = 0.0
    while t0 < DUR - 0.2:
        start = int(t0 * SR)
        noise = np.random.randn(burst) * np.exp(-np.arange(burst) / (0.008 * SR))
        noise = highpass(lowpass(noise, 6000), 2000)
        end = min(n, start + burst)
        y[start:end] += noise[: end - start] * level
        i += 1
        t0 += every
    return y


def water(n: int) -> np.ndarray:
    white = np.random.randn(n)
    brown = np.cumsum(white)
    brown -= brown.mean()
    brown /= np.max(np.abs(brown)) + 1e-9
    bed = highpass(lowpass(brown, 900), 180)
    t = np.arange(n) / SR
    swell = 0.55 + 0.45 * np.sin(2 * np.pi * t / 9)
    return bed * swell * 0.22


def finish(buf: np.ndarray) -> np.ndarray:
    fade = int(0.04 * SR)
    ramp = np.linspace(0, 1, fade)
    buf[:fade] *= ramp[:, None]
    buf[-fade:] *= ramp[::-1, None]
    peak = np.max(np.abs(buf)) + 1e-9
    buf = np.tanh(buf / peak) * 0.62
    jump = float(np.max(np.abs(buf[0] - buf[-1])))
    print(f"  seam {jump:.5f} peak {np.max(np.abs(buf)):.3f}")
    return buf


def empty() -> np.ndarray:
    return np.zeros((int(DUR * SR), 2), dtype=np.float64)


def add_mono(buf: np.ndarray, mono: np.ndarray, level: float = 1.0) -> None:
    stereo = stereo_from_mono(mono * level)
    buf += stereo


def classroom() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    add_mono(buf, pad([midi(48), midi(52), midi(55), midi(59)], n, 0.16))
    scale = [72, 74, 76, 79, 81]
    t = 1.2
    step = 0
    while t < DUR - 1.5:
        note = scale[step % len(scale)]
        place(buf, t, piano(midi(note), 2.8, 0.22), pan=0.2 if step % 2 else -0.15)
        t += 3.0
        step += 1
    return finish(buf)


def holdkor() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    add_mono(buf, pad([midi(50), midi(53), midi(57), midi(60)], n, 0.14))
    add_mono(buf, soft_kick(int(DUR / 1.8), 1.8, n), 0.7)
    t = np.arange(n) / SR
    air = np.sin(2 * np.pi * midi(81) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 9))
    add_mono(buf, lowpass(air, 1200) * 0.04)
    return finish(buf)


def library() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    add_mono(buf, water(n), 0.25)
    scale = [57, 60, 62, 64, 67, 69]
    t = 0.8
    step = 0
    while t < DUR - 1.2:
        place(buf, t, kalimba(midi(scale[step % len(scale)]), 3.2, 0.34), pan=(-0.25 if step % 2 else 0.2))
        t += 2.25
        step += 1
    return finish(buf)


def office() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    add_mono(buf, pad([midi(55), midi(59), midi(62)], n, 0.1))
    add_mono(buf, shaker(0.5, n, 0.05))
    motif = [67, 71, 74, 79]
    t = 0.6
    step = 0
    while t < DUR - 1.0:
        place(buf, t, kalimba(midi(motif[step % len(motif)]), 1.4, 0.28), pan=0.05)
        t += 1.125
        step += 1
    return finish(buf)


def apartment() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    chords = [
        [53, 57, 60, 64],
        [52, 55, 59, 62],
        [50, 53, 57, 60],
        [48, 52, 55, 59],
    ]
    for i, chord in enumerate(chords):
        start = i * 9.0
        for k, note in enumerate(chord):
            place(buf, start + k * 0.045, piano(midi(note), 8.5, 0.2), pan=-0.1 + k * 0.06)
        place(buf, start + 3.2, piano(midi(chord[-1] + 12), 4.0, 0.16), pan=0.15)
    return finish(buf)


def bekas() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    add_mono(buf, water(n), 0.85)
    add_mono(buf, pad([midi(52), midi(55), midi(59)], n, 0.1))
    t = 2.0
    while t < DUR - 2:
        place(buf, t, piano(midi(64), 5.0, 0.12), pan=0.0)
        t += 6.0
    return finish(buf)


def tension() -> np.ndarray:
    n = int(DUR * SR)
    t = np.arange(n) / SR
    swell = 0.75 + 0.25 * np.sin(2 * np.pi * t / 12)
    y = np.zeros(n)
    for f, amp in ((110, 0.5), (116.5, 0.42), (220, 0.22), (233, 0.16), (329, 0.05)):
        y += amp * np.sin(2 * np.pi * f * t)
    y = lowpass(y, 700) * swell * 0.2
    buf = stereo_from_mono(y, 0.2)
    return finish(buf)


def ending() -> np.ndarray:
    n = int(DUR * SR)
    buf = empty()
    add_mono(buf, pad([midi(48), midi(52), midi(55), midi(59), midi(64)], n, 0.2))
    arp = [60, 64, 67, 71, 72]
    t = 0.5
    step = 0
    while t < DUR - 1.4:
        place(buf, t, piano(midi(arp[step % len(arp)]), 3.4, 0.26), pan=0.12 if step % 2 else -0.08)
        t += 1.8
        step += 1
    return finish(buf)


TRACKS = {
    "classroom_calm": classroom,
    "holdkor_night": holdkor,
    "library_quiet": library,
    "office_morning": office,
    "apartment_evening": apartment,
    "bekas_to_dark": bekas,
    "tension_low": tension,
    "ending_true": ending,
}


def write_wav(path: Path, audio: np.ndarray) -> None:
    pcm = np.clip(audio, -1, 1)
    interleaved = (pcm * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(2)
        handle.setsampwidth(2)
        handle.setframerate(SR)
        handle.writeframes(interleaved.tobytes())


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, build in TRACKS.items():
        print(name)
        audio = build()
        wav = OUT / f"{name}.wav"
        mp3 = OUT / f"{name}.mp3"
        write_wav(wav, audio)
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(wav), "-codec:a", "libmp3lame", "-b:a", "160k", str(mp3)],
            check=True,
            capture_output=True,
        )
        wav.unlink()
        print(f"  {mp3.name} {mp3.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
