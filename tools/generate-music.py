#!/usr/bin/env python3
"""Warmer seamless loops for Ligetvár. Instrumental, no vocals."""

from __future__ import annotations

import subprocess
import wave
from pathlib import Path

import numpy as np

SR = 44100
DUR = 32.0
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "music"


def midi(n: float) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


def fade_edges(note: np.ndarray, attack: float = 0.02, release: float = 0.4) -> np.ndarray:
    a = min(len(note), int(attack * SR))
    r = min(len(note), int(release * SR))
    note[:a] *= np.linspace(0, 1, a)
    note[-r:] *= np.linspace(1, 0, r)
    return note


def tone(freq: float, dur: float, harmonics: tuple[tuple[float, float, float], ...], vel: float) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for ratio, amp, decay in harmonics:
        y += amp * np.sin(2 * np.pi * freq * ratio * t) * np.exp(-t * decay)
    return fade_edges(y * vel, 0.012, min(dur * 0.45, 1.2))


def piano(freq: float, dur: float = 3.2, vel: float = 0.34) -> np.ndarray:
    return tone(
        freq,
        dur,
        ((1, 1, 1.6), (2, 0.28, 2.4), (3, 0.12, 3.2), (4, 0.05, 4.2)),
        vel,
    )


def bell(freq: float, dur: float = 2.4, vel: float = 0.22) -> np.ndarray:
    return tone(
        freq,
        dur,
        ((1, 1, 2.2), (2.76, 0.35, 3.4), (5.2, 0.12, 5)),
        vel,
    )


def pad(freqs: list[float], n: int, level: float) -> np.ndarray:
    t = np.arange(n) / SR
    y = np.zeros(n)
    for f in freqs:
        for det in (-0.004, 0.0, 0.004):
            lfo = 0.86 + 0.14 * np.sin(2 * np.pi * t / 16 + f)
            y += lfo * np.sin(2 * np.pi * f * (1 + det) * t)
    kernel = np.hanning(801)
    kernel /= kernel.sum()
    y = np.convolve(y, kernel, mode="same")
    return y / max(len(freqs), 1) * level


def reverb(x: np.ndarray, wet: float = 0.34) -> np.ndarray:
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    rng = np.random.default_rng(7)
    impulse = np.exp(-t * 2.4) * rng.normal(0, 1, n)
    for delay, gain in ((0.029, 0.6), (0.043, 0.45), (0.067, 0.3), (0.091, 0.2)):
        shift = int(delay * SR)
        impulse[shift:] += gain * np.exp(-t[:-shift] * 1.6) * rng.normal(0, 0.4, n - shift)
    impulse /= np.max(np.abs(impulse)) + 1e-9
    size = 1 << (len(x) + n - 2).bit_length()
    wet_sig = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(impulse, size), size)[: len(x)]
    peak = np.max(np.abs(wet_sig)) + 1e-9
    return x * (1 - wet) + wet_sig / peak * np.max(np.abs(x) + 1e-9) * wet


def place(buf: np.ndarray, start: float, note: np.ndarray, pan: float = 0.0) -> None:
    i = int(start * SR)
    if i < 0 or i >= len(buf):
        return
    end = min(len(buf), i + len(note))
    chunk = note[: end - i]
    buf[i:end, 0] += chunk * np.sqrt(0.5 * (1 - pan))
    buf[i:end, 1] += chunk * np.sqrt(0.5 * (1 + pan))


def finish(buf: np.ndarray) -> np.ndarray:
    mixed = np.stack([reverb(buf[:, 0], 0.32), reverb(buf[:, 1], 0.32)], axis=1)
    n = int(1.2 * SR)
    fade = np.linspace(0, 1, n)[:, None]
    head = mixed[:n] * fade + mixed[-n:] * (1 - fade)
    looped = np.concatenate([head, mixed[n:-n]])
    peak = np.max(np.abs(looped)) + 1e-9
    looped = looped / peak * 0.42
    print(f"  peak {np.max(np.abs(looped)):.3f} rms {np.sqrt(np.mean(looped**2)):.3f}")
    return looped.astype(np.float32)


def empty() -> np.ndarray:
    return np.zeros((int(DUR * SR), 2))


def add_pad(buf: np.ndarray, freqs: list[float], level: float) -> None:
    body = pad(freqs, len(buf), level)
    buf[:, 0] += body
    buf[:, 1] += body * 0.92


def sprinkle(buf: np.ndarray, notes: list[int], every: float, voice, vel: float, start: float = 0.6) -> None:
    t = start
    step = 0
    while t < DUR - 1.4:
        place(buf, t, voice(midi(notes[step % len(notes)]), vel=vel), pan=0.18 if step % 2 else -0.16)
        t += every
        step += 1


def classroom() -> np.ndarray:
    buf = empty()
    add_pad(buf, [midi(48), midi(52), midi(55), midi(59)], 0.16)
    sprinkle(buf, [72, 76, 79, 74, 71], 3.2, piano, 0.28)
    return finish(buf)


def holdkor() -> np.ndarray:
    buf = empty()
    add_pad(buf, [midi(46), midi(50), midi(53), midi(58)], 0.15)
    t = np.arange(len(buf)) / SR
    pulse = np.sin(2 * np.pi * 52 * t) * np.exp(-np.mod(t, 1.6) * 8) * ((np.mod(t, 1.6) < 0.2).astype(float))
    buf[:, 0] += pulse * 0.18
    buf[:, 1] += pulse * 0.16
    sprinkle(buf, [70, 72, 75, 77], 3.2, bell, 0.16, 1.1)
    return finish(buf)


def library() -> np.ndarray:
    buf = empty()
    add_pad(buf, [midi(57), midi(60), midi(64)], 0.08)
    sprinkle(buf, [69, 72, 76, 74, 67], 2.4, bell, 0.24, 0.4)
    return finish(buf)


def office() -> np.ndarray:
    buf = empty()
    add_pad(buf, [midi(55), midi(59), midi(62)], 0.12)
    sprinkle(buf, [67, 71, 74, 79], 1.6, bell, 0.18, 0.3)
    return finish(buf)


def apartment() -> np.ndarray:
    buf = empty()
    add_pad(buf, [midi(53), midi(57), midi(60), midi(64)], 0.14)
    for i, chord in enumerate(([53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59])):
        for k, note in enumerate(chord):
            place(buf, i * 8 + k * 0.06, piano(midi(note), 7.5, 0.2), pan=-0.1 + k * 0.06)
    return finish(buf)


def bekas() -> np.ndarray:
    buf = empty()
    rng = np.random.default_rng(3)
    noise = np.cumsum(rng.normal(0, 1, len(buf)))
    noise -= noise.mean()
    noise /= np.max(np.abs(noise))
    kernel = np.hanning(2401)
    kernel /= kernel.sum()
    bed = np.convolve(noise, kernel, mode="same")
    t = np.arange(len(buf)) / SR
    bed *= 0.08 * (0.7 + 0.3 * np.sin(2 * np.pi * t / 8))
    buf[:, 0] += bed
    buf[:, 1] += np.convolve(bed, np.hanning(400) / np.hanning(400).sum(), mode="same")
    add_pad(buf, [midi(52), midi(55), midi(59)], 0.1)
    sprinkle(buf, [64, 67, 71], 6.4, piano, 0.12, 1.5)
    return finish(buf)


def tension() -> np.ndarray:
    n = len(empty())
    t = np.arange(n) / SR
    swell = 0.8 + 0.2 * np.sin(2 * np.pi * t / 16)
    y = np.zeros(n)
    for f, amp in ((110, 0.45), (116, 0.32), (164, 0.16), (220, 0.08)):
        y += amp * np.sin(2 * np.pi * f * t)
    kernel = np.hanning(1201)
    kernel /= kernel.sum()
    y = np.convolve(y, kernel, mode="same") * swell * 0.22
    buf = np.stack([y, np.convolve(y, np.hanning(300) / 200, mode="same")], axis=1)
    return finish(buf)


def ending() -> np.ndarray:
    buf = empty()
    add_pad(buf, [midi(48), midi(52), midi(55), midi(59), midi(64)], 0.18)
    sprinkle(buf, [60, 64, 67, 72, 71, 67], 1.6, piano, 0.22, 0.4)
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
            ["ffmpeg", "-y", "-i", str(wav), "-codec:a", "libmp3lame", "-q:a", "2", str(mp3)],
            check=True,
            capture_output=True,
        )
        wav.unlink()
        print(f"  {mp3.name} {mp3.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
