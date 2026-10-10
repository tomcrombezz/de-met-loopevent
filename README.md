# De MET · loopevent

Statische promotiewebsite in gewone HTML, CSS en JavaScript. Er is geen buildstap of extra dependency nodig.

## Lokaal bekijken

Open een terminal in deze map en start een lokale server:

```powershell
python -m http.server 5173
```

Ga daarna naar <http://localhost:5173>. Stop de server met `Ctrl+C`.

## Eventgegevens aanpassen

Pas de waarden in `event-data.js` aan. Vul feiten pas in wanneer ze bevestigd zijn. De inschrijvingsknop wordt automatisch actief zodra `registrationUrl` een geldige HTTPS-link bevat. Contact en officiële website verschijnen als links zodra de bijbehorende waarden zijn ingevuld.

De hero-foto staat in `assets/loop-community.jpg`; het bestaande De MET-logo staat in `assets/demet-logo.jpg`.
