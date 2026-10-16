# 35 — Dialógusfák és intim jelenetek (bővített, képekhez kötött)

Ez a dokumentum a meglévő `dialogues/part1/*.json` és `locales/hu.json` alapján készült. Javított, karakterhűbb és érzékibb dialógusokat ad az intim node-okhoz, és új jeleneteket javasol, amelyek közvetlenül használják az `assets/references/intim/` képeket.

**Szabályok** (a 09-es doc alapján):
- Max 4 választás (very_good / good / bad / very_bad).
- Hatások: closeness, trust, anger, risk, flags.
- Follow-node a nagyon jó válaszokra.
- Intim képek csak magas bizalom + privát hely + megfelelő flag után.

---

## Javított intim dialógusok (létező node-ok)

### Rebeka — intimate_private
**text_key: dialogue.rebeka.intimate_private**
„A lakásban sötét van. A kulcslyuknál a ruha már nem fog. Ha akarod, megmutatom a sebhelyet. És azt is, ami alatta van.”

**vg**: „Mutasd. Itt nincs senki. A sebhely is a tiéd. A tested is.”
**react**: „(A gallér szétnyílik. A hangja halkabb.) Csak te látod. Ne vidd ki innen.”

### Rebeka — yield_control
**text_key: dialogue.rebeka.yield_control**
„A kontrollt átadom. Te vezetsz. Én csak érzem. Nincs közönség, nincs történet.”

**vg**: „Add át. Én döntök. Te csak lélegezz.”
**react**: „(A kulcsot nem adja át, de a vállat engedi.) Vezess. Ne hívj senkit.”

### Boglárka — slow_explore
**text_key: dialogue.boglarka.slow_explore**
„A kardigán lecsúszott. Ha lassan érintesz… a melleim… nem szégyen?”

**vg**: „Nem szégyen. Gyönyörűk. Lassan. Csak mi.”
**react**: „(Elpirul, de nem húzza vissza a kardigánt.) Lassan. És mondd végig.”

### Boglárka — body_praise
**text_key: dialogue.boglarka.body_praise**
„Mondd, hogy a formáim kívánatosak. A puha hasam, a combjaim, a melleim…”

**vg**: „Minden porcikád kívánatos. A tested tökéletes így.”
**react**: „(A szája elnyílik, aztán becsukja.) Ne hangosan. De… jó hallani.”

### Gréta — rule_break
**text_key: dialogue.greta.rule_break**
„Ma este nincsenek szabályok. Ha akarod, a szoknyám felhúzható. A kontroll nálad van.”

**vg**: „Nincsenek szabályok. Te engedsz, én vezetek.”
**react**: „(A szemüveg megcsillan.) Akkor… te mondod, mi a következő.”

### Gréta — yield
**text_key: dialogue.greta.yield**
„A bilincs… ha akarod, tedd fel. Én csak engedelmeskedem.”

**vg**: „Igen. A csuklódon. Én döntök.”
**react**: „(A lélegzete elakad, aztán enged.) Vezess.”

---

## Új intim jelenetek (képekhez kötve)

### Boglárka — nude standing / all-fours (apartment.jpg vagy library.jpg)
**Node id: boglarka_nude_explore**
Speaker: boglarka
Text: „A ruha már a földön van. Így… látsz? Lassan.”
VG: „Látlak. Szép vagy. Gyere közelebb.”
Flag: flag_boglarka_nude
Image ref: boglarka-nude-standing.jpg / boglarka-nude-allfours.jpg

### Gréta — bound / desk (department.jpg vagy apartment.jpg)
**Node id: greta_bound_desk**
Text: „A bilincs a csuklómon. Az asztalon… nincsenek papírok. Csak én.”
VG: „Maradj így. Én vezetek.”
Image ref: greta-hardcore-bound-v2.jpg / greta-nude-allfours-desk.jpg

### Rebeka — private intense (bekas-to.jpg vagy apartment.jpg)
**Node id: rebeka_private_intense**
Text: „Sötét van. Senki nem hallja. A kontroll nálad.”
VG: „Itt maradunk. Intenzíven. Utána csend.”
Image ref: rebeka-hardcore-yield-kneeling.jpg / rebeka-nude-standing.jpg

### Duo (csak páros útvonal, külön képek)
**Node id: boglarka_greta_kiss**
Text (Boglárka): „Gréta… ha te is akarod.”
Image ref: boglarka-greta-kiss-standing.jpg / boglarka-greta-kiss-bed.jpg

---

## Használati útmutató

1. A javított szövegeket másold a `locales/hu.json` megfelelő kulcsai alá.
2. Az új node-okat add hozzá a megfelelő `dialogues/part1/*.json` fájlhoz (vagy part2-höz).
3. A képek flag + bizalom + hely alapján jelennek meg (lásd 20-kep-jelenet-lista.md).
4. Teszteld headless módban a hatásokat.

A meglévő Part 1 játszható marad. Ez a réteg a mélyebb intim tartalmat és a képhasználatot adja.
