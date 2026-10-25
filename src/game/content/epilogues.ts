export const institutions={
 acknowledged:'A főiskola nyilvánosan elismeri az esetet. Az engedélyezett tanúvallomásokat a megőrzött iratokkal együtt adják át. A felépüléshez külön támogatást biztosítanak.',
 incomplete:'A főiskola részleges tájékoztatást ad. A sérült vagy visszatartott bizonyítékok miatt több kérdés nyitva marad.',
 suppressed:'A vezetés belső üggyé szűkíti az esetet. A csoport megőrzi az engedélyezett feljegyzéseket; a hivatalos közlés hallgat a lényegéről.'
};
export const relationships:Record<string,string>={
 rebeka:'Rebeka maga választ képet a kiállításához. Nem a tanár elismerését kéri: Mártonnal olyan időt keresnek, amelyben egyiküknek sem kell szerepelnie. Ami a nézők elé kerül, arról ő dönt.',
 boglarka:'Boglárka a saját neve alatt adja le a tanulmányát. Nem rejti el Márton nevét, de a kapcsolatot sem a dolgozat magyarázza. Ő mondja ki, hogyan szeretne együtt maradni.',
 greta:'Gréta befejezetlen táblázatot hagy az irodában. Márton a tó felé várja, lista nélkül. A találkozót azért írják be, mert akarják, nem mert hasznosnak kell lenniük.',
 triad:'Rebeka és Boglárka egymásnak mutatják meg először a készülő kép–szöveg párost. Márton teát főz. Külön időpontjaik és közös estéik is vannak. Mindhárman kimondták, hogy ezt szeretnék; az egyeztetést egyikük sem tekinti egyszer s mindenkorra letudott feladatnak.',
 friendship:'Barátként találkoznak újra. Rebeka képet hoz, Boglárka szöveget, Gréta ezúttal csak önmagát. A közösen végigvitt ügy nem követelt szerelmet.',
 unresolved:'Maradt közelség és kimondatlan kérdés. A hiányzó beszélgetést nem helyettesíti a közös veszély emléke. A félév kapcsolat ígérete nélkül zárul.',
 estranged:'A visszalépést tiszteletben tartották. A közös nyomozás megmarad, a magánéleti találkozások elmaradnak. Senki nem tartozik érzelmekkel azért, mert segítséget kapott.'
};

export function threatText(cost:string|null){return 'A vámpír meghalt a megszakított átalakulásban. '+(cost==='supported'?'A gyakorlás és a segítők jelenléte csökkentette a kimerülést, a bizonyítékok megmaradtak.':'A segítők megállították a rítust, de a csoport súlyosan kimerült, és iratok sérültek meg.')+' Lilla és a többiek fokozatosan épülnek fel; az emlékek nem térnek vissza egyszerre.';}
