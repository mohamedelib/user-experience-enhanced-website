# AdConnect website
[Live website](https://the-web-is-for-everyone-interactive-gy8v.onrender.com/)

## Korte uitleg van de opdracht en oplossing
Voor dit project heb ik een deel van de AdConnect website opnieuw ontworpen en uitgebreid. De opdracht was om een duidelijkere en beter werkende website te maken. Ik heb een nieuwe home pagina gemaakt, de Talent Award pagina verbeterd en een studenten pagina ontwikkeld voor genomineerde studenten.

De Talent Award pagina toont een overzicht van genomineerde studenten. Vanaf deze pagina kan de gebruiker doorklikken naar een studenten pagina.

De studenten pagina toont informatie over een specifieke student zoals naam, opleiding en instelling. De gegevens komen uit een externe database en worden dynamisch geladen.



## Responsive

De website is gebouwd met de Mobile First methode.

Op kleine schermen staat de inhoud onder elkaar.
Op grotere schermen verschijnen meerdere kolommen.

<img width="1153" height="413" alt="image" src="https://github.com/user-attachments/assets/58308f17-8a69-4fed-86e4-7e5dc78a0c3b" />
<img width="1067" height="425" alt="image" src="https://github.com/user-attachments/assets/92c61c4e-b312-4833-9cac-509c8a5b79a2" />
<img width="1135" height="431" alt="image" src="https://github.com/user-attachments/assets/06767217-62ce-4313-8e94-c2a5b4e353ca" />



## Toegankelijkheid
De website is mobile first opgebouwd. Het ontwerp start bij een one column layout en schaalt mee naarmate er meer schermruimte beschikbaar is.

Bij grotere schermen worden elementen naast elkaar geplaatst, zoals de navigatie. Van de breedte wordt steeds beter gebruik gemaakt, terwijl de inhoud overzichtelijk en leesbaar blijft. 

Deze aanpak volgt de stappen van mobile first en responsive design en zorgt voor een consistente ervaring op elk apparaat.

## Huisstijl

De website gebruikt kleuren uit de AdConnect styleguide.
Titels, witruimte en afbeeldingen zorgen voor een duidelijke structuur en focus op de studenten.

<img width="213" height="432" alt="image" src="https://github.com/user-attachments/assets/d019084a-f6d4-42f9-b864-00b9cd87f9c0" />


## Interactief

Op de Talent Award pagina staan kaarten van studenten.
Wanneer een gebruiker op een kaart klikt opent de studenten pagina van die persoon.
Dit gebeurt via een dynamische route.


## Interacties

De belangrijkste interacties zijn het sorteren van data uit de database en het
comment systeem op de nominatie pagina.

## Feed-forward

De button met de tekst "Laat je reactie achter" laat zien dat je een comment kan plaatsen.
<img width="588" height="40" alt="image" src="https://github.com/user-attachments/assets/23ee7483-fbc1-4ae3-abd0-1a1ece342097" />


## Feedback

Wanneer je een veld niet heb ingevuld, komt er een rode styling te voorschijn met 2 messages. De messages geven extra feedback aan de gebruiker 
<img width="628" height="221" alt="image" src="https://github.com/user-attachments/assets/28228f1d-78a9-4208-8507-c310ee1d3c7a" />

Wanneer je comment gelukt is krijg je gelijk feedback. 
<img width="674" height="513" alt="image" src="https://github.com/user-attachments/assets/6734f2d2-82f9-4827-b120-39ae791c927a" />

## Progressive enhancement
De website is gebouwd in drie lagen.

-HTML zorgt dat de content en het formulier altijd werken, ook zonder CSS of JavaScript.

-Baseline CSS voegt de layout, kleuren en feedback toe.

-Enhance de functionaliteit geleidelijk voor een betere User Experience

Ik heb daarvoor bijvoorbeeld UI states en een darkmode toegevoegd. Dark mode werkt via @media (prefers-color-scheme: dark). De site ziet er standaard uit in light mode. Heeft de gebruiker dark mode aan op zijn telefoon of laptop, dan passen de kleuren zich automatisch aan. 
Als een veld niet is ingevuld krijgt het de class field-error. Dit regelt de server.
Dark mode en foutmeldingen zijn extra lagen die de ervaring verbeteren maar niet nodig zijn om de site te gebruiken.

## Kenmerken

HTML zorgt voor de structuur van de pagina.
CSS regelt de layout met grid en media queries en de styleguide.
JavaScript haalt data op uit een API en toont deze op de pagina.

### HTML
```
<section class="nominatiebericht">
<h2 id="berichtenn">Berichten</h2>
<div class="comments-list">
    {% for comment in comments %}
      <div class="commentcard">
        <div class="row1">
          <p>{{ comment.name }}</p>
          <p>{{ comment.date_created }}</p>
        </div>
        <p>{{ comment.comment }}</p>
        <p>Nominatie #{{ comment.nomination }}</p>
      </div>
    {% endfor %}
</div>

<form class="comment-form" action="/Talentaward/student/{{ studentTitle }}/comment" method="POST">
  <label>Comment
    <textarea placeholder="Schrijf jouw reactie..." name="message">{{ form.message }}</textarea>
  </label>
  <label>Naam
    <input type="text" placeholder="Jouw naam" name="afzender" value="{{ form.afzender }}">
  </label>
  <button type="submit">Laat je reactie achter</button>
</form>
```
De pagina gebruikt semantische HTML.
Twee headers bevatten de navigatie en het logo.
Main bevat het studentprofiel, de video, het verhaal en de reacties.
Reacties worden opgehaald met een for-loop in Liquid en getoond in de comments-list.
Het formulier verstuurt data via method= POST naar de database.
Bij een leeg veld krijgt het element de class field-error zodat het opvalt.
Een succesbericht wordt getoond via een andere partialview als de reactie geplaatst is.

## CSS
```
:root {
  --color-brand-active: hsl(213, 100%, 28%);
  --color-brand-subtle: hsl(213, 100%, 88%);
  --color-text: hsl(213, 21%, 9%);
  --color-text2: white;
  --color-bg-page: hsl(0, 0%, 98%);
  --color-bg-surface: hsl(0, 0%, 100%);

  --space-md: clamp(16px, 1.5vw, 20px);
  --h1-size: clamp(1.875rem, 1.602rem + 1.1494vw, 2.5rem);
  --font-body: "Archivo", sans-serif;
  --font-heading: "ClashDisplay", sans-serif;
}

.nominatiebericht {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background: var(--color-bg-surface);
  border: 2px solid var(--color-brand-active);
  border-radius: 13px;
  padding: 16px;
}

textarea.field-error,
input[type="text"].field-error {
  border: 2px solid red;
  background: #fde8e8;
}
```

De stylesheet gebruikt custom properties in :root voor kleuren, spacing en typografie.
Dit maakt het makkelijk om waardes op een plek aan te passen.
De layout werkt mobile-first. Media queries voegen pas grid en extra kolommen toe vanaf grotere schermen.
Dark mode wordt geregeld met ```@media (prefers-color-scheme: dark)``` door custom properties te overschrijven in ```:root```.
Formuliervelden met validatiefouten krijgen de class ```field-error```. Die class geeft een rode border en lichtroze achtergrond zodat de gebruiker direct ziet wat er mis is.
Succes- en foutmeldingen hebben eigen classes met groene en rode kleuren voor duidelijke visuele feedback.

## Server javacsript
```
app.post(
  "/Talentaward/student/:title/comment",
  async function (request, response) {
    const studentTitle = decodeURIComponent(request.params.title);
    const { message, afzender } = request.body;

    const student = awardDataJSON.data.find((s) => s.title === studentTitle);

    const errors = [];
    if (!message) errors.push("message");
    if (!afzender) errors.push("afzender");

    if (errors.length > 0) {
      return response.render("student.liquid", {
        submitted: true,
        errors: errors,
        form: { message: message || "", afzender: afzender || "" },
      });
    }

    await fetch(
      "https://fdnd-agency.directus.app/items/adconnect_nominations_comments",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: message,
          name: afzender,
          nomination: student.id,
        }),
      },
    );

    response.redirect(
      `/Talentaward/student/${encodeURIComponent(studentTitle)}?success=true#berichtenn`,
    );
  },
);
```
De server draait op Express met LiquidJS als template.
Data wordt bij het opstarten opgehaald van de Directus API en opgeslagen in variabelen.
Het POST endpoint(/Talentaward/student/:title/comment) valideert server-side of alle velden zijn ingevuld.
Bij een succesvolle submit stuurt de server de data via fetch met POST naar de Directus API.
Na het opslaan doet de server een redirect met een query parameter success=true en een fragment #berichtenn. Daardoor scrollt de browser na het herladen direct naar de berichten sectie.

## Videofragment interactie:

https://github.com/user-attachments/assets/865db40a-854e-478b-aa00-e6bdb88a2d87


Ontwerpkeuzes
Fout- en succesmeldingen zitten in aparte partials zodat ik code niet hoef te herhalen.
Na een mislukte submit blijven ingevulde waardes staan zodat de gebruiker niet opnieuw hoeft te typen.



## GEBRUIKERSTEST

In [issue 7](https://github.com/mohamedelib/the-web-is-for-everyone-interactive-functionality/issues/7) beschrijf ik de user story voor het plaatsen van een comment bij een Talent Award kandidaat.

Wat ik testte

Ik wilde weten of gebruikers zonder problemen een reactie kunnen achterlaten bij een kandidaat. Ik focuste op het comment formulier en de feedback na het versturen.

Probleem

Het formulier staat helemaal onderaan de pagina. Gebruikers moeten eerst langs alle berichten scrollen voordat ze zelf iets kunnen typen. Dat is onhandig.

Oplossing

Ik heb de comments sectie en de form gescheiden van elkaar. Hierdoor kun je scrollen in de comment lijst en staat de form altijd onderaan.

Waarom dit werkt

De gebruiker ziet gelijk dat hij een comment kan achterlaten zonder dat hij eerst door de berichten moest scrollen.

Feedback na actie

Na het plaatsen van een reactie verschijnt er een succesbericht. De reactie is direct zichtbaar tussen de andere berichten. Dit bevestigt dat de actie is gelukt.

## WCAG AUDIT

Voor dit project heb ik een [WCAG audit](https://github.com/mohamedelib/the-web-is-for-everyone-interactive-functionality/issues/12) uitgevoerd om de toegankelijkheid te controleren. Ik heb gekeken naar contrast, toetsenbordbediening, structuur. De uitkomst en verbeterpunten heb ik vastgelegd.

De volledige WCAG audit is [hier](https://github.com/mohamedelib/the-web-is-for-everyone-interactive-functionality/issues/12) te vinden

## Bronnen

## Bronnen

HTML:
- [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
- [label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
- [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

CSS:
- [Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [Media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

JavaScript/Server:
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

