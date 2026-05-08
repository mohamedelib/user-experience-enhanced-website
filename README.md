# AdConnect website
[Live website](https://user-experience-enhanced-website-msxt.onrender.com//)

## Korte uitleg van de opdracht en oplossing
Voor dit project heb ik een deel van de AdConnect website opnieuw ontworpen en uitgebreid. De opdracht was om een duidelijkere en beter werkende website te maken. Ik heb een nieuwe home pagina gemaakt, de Talent Award pagina verbeterd en een studenten pagina ontwikkeld voor genomineerde studenten.

De Talent Award pagina toont een overzicht van genomineerde studenten. Vanaf deze pagina kan de gebruiker doorklikken naar een studenten pagina.

De studenten pagina toont informatie over een specifieke student zoals naam, opleiding en instelling. De gegevens komen uit een externe database en worden dynamisch geladen.



## Responsive

De website is gebouwd met de Mobile First methode.

Op kleine schermen staat de inhoud onder elkaar.
Op grotere schermen verschijnen meerdere kolommen.
<img width="799" height="421" alt="image" src="https://github.com/user-attachments/assets/9779b6ff-c38c-487c-adf3-a5a35347815c" />





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
<img width="866" height="753" alt="image" src="https://github.com/user-attachments/assets/f95bfd6f-195a-4075-8259-52f51f1e974d" />


Wanneer je comment gelukt is krijg je gelijk feedback. 
<img width="865" height="672" alt="image" src="https://github.com/user-attachments/assets/0badffde-69e3-47a2-ae51-9444d9038fe1" />

**Loading state**
Wanneer een gebruiker op de submit button klikt, verandert de tekst naar "Bezig met Versturen..." en wordt de button uitgeschakeld. Dit voorkomt dat de gebruiker meerdere keren op de button klikt terwijl het formulier verstuurd wordt. De gebruiker ziet direct dat er iets gebeurt.
<img width="858" height="629" alt="image" src="https://github.com/user-attachments/assets/77dd56f8-ced7-4b79-978e-eb075e5819f0" />



## Progressive enhancement
De website is gebouwd in drie lagen.

-HTML zorgt dat de content en het formulier altijd werken, ook zonder CSS of JavaScript.

-Baseline CSS voegt de layout, kleuren en feedback toe.

-Enhance de functionaliteit geleidelijk voor een betere User Experience

Ik heb daarvoor bijvoorbeeld UI states en een darkmode toegevoegd. Dark mode werkt via @media (prefers-color-scheme: dark). De site ziet er standaard uit in light mode. Heeft de gebruiker dark mode aan op zijn telefoon of laptop, dan passen de kleuren zich automatisch aan. 
Als een veld niet is ingevuld krijgt het de class field-error. Dit regelt de server.
Dark mode en foutmeldingen zijn extra lagen die de ervaring verbeteren maar niet nodig zijn om de site te gebruiken.

## Ontwerpkeuzes

**Formulier validatie**
Ik gebruik server-side én client-side validatie gecombineerd. JavaScript voegt direct een `field-error` class toe zodat de gebruiker feedback krijgt zonder pagina reload. Als JavaScript uitvalt, vangt de server de validatie op.

**Button states**
De submit button heeft een `hover` en `focus` state met een transitie van 150ms. Onder de 300ms ervaart de gebruiker dit als directe feedback.

**Delete functionaliteit**
Comments kunnen verwijderd worden via een klein formulier per comment. HTML forms ondersteunen geen DELETE method, daarom gebruik ik een POST route met `/delete` in de URL.

Fout- en succesmeldingen zitten in aparte partials zodat ik code niet hoef te herhalen.
Na een mislukte submit blijven ingevulde waardes staan zodat de gebruiker niet opnieuw hoeft te typen.

## Performance

### Performant images
[Issue #15](https://github.com/mohamedelib/user-experience-enhanced-website/issues/15)

Ik heb de afbeeldingen in mijn project geoptimaliseerd op vier punten. Afbeeldingen laadden als gewone JPEG/PNG, hadden geen lazy loading, geen prioriteit en geen resolution switching. Ik heb `<picture>` toegevoegd met avif en webp zodat de browser het kleinste formaat kiest. Met `loading="lazy"` laadt een afbeelding pas als de gebruiker ernaartoe scrollt. De belangrijkste afbeelding heeft `fetchpriority="high"` gekregen zodat die als eerste laadt.

### Layout shift
[Issue #18](https://github.com/mohamedelib/user-experience-enhanced-website/issues/18)

Ik heb een Lighthouse test gedaan op de homepagina. De Cumulative Layout Shift scoorde goed, maar via de performance tab ontdekte ik een layout shift van 0.0019 op 566.7ms. Dit kwam doordat drie afbeeldingen geen `width` en `height` hadden in de HTML, waardoor de browser de ruimte niet kon reserveren voordat de afbeelding laadde. De oplossing was het toevoegen van de juiste `width` en `height` aan die afbeeldingen.

## Kenmerken

HTML zorgt voor de structuur van de pagina.
CSS regelt de layout met grid en media queries en de styleguide.
JavaScript haalt data op uit een API en toont deze op de pagina.

### HTML
Reacties worden opgehaald met een for-loop in Liquid. Bij een leeg veld krijgt het element de class `field-error`. Afbeeldingen gebruiken `<picture>` met avif en webp, `loading="lazy"` en `fetchpriority="high"` op de belangrijkste afbeelding.

### CSS
Custom properties in `:root` voor kleuren, spacing en typografie. Dark mode via `@media (prefers-color-scheme: dark)`. Velden met fouten krijgen de class `field-error` met rode border en lichtroze achtergrond.

### Server JavaScript
Express met LiquidJS als template. De POST route valideert server-side of alle velden zijn ingevuld. Bij fouten wordt de pagina opnieuw gerenderd met `submitted: true`. Bij succes volgt een redirect met `?success=true` en een fragment zodat de browser direct naar de berichten scrollt.

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



 ## Kenmerken

### HTML
Reacties worden opgehaald met een for-loop in Liquid. Bij een leeg veld krijgt het element de class `field-error`. Afbeeldingen gebruiken `<picture>` met avif en webp, `loading="lazy"` en `fetchpriority="high"` op de belangrijkste afbeelding.

### CSS
Custom properties in `:root` voor kleuren, spacing en typografie. Dark mode via `@media (prefers-color-scheme: dark)`. Velden met fouten krijgen de class `field-error` met rode border en lichtroze achtergrond.

### Server JavaScript
Express met LiquidJS als template. De POST route valideert server-side of alle velden zijn ingevuld. Bij fouten wordt de pagina opnieuw gerenderd met `submitted: true`. Bij succes volgt een redirect met `?success=true` en een fragment zodat de browser direct naar de berichten scrollt.


## Bronnen

HTML:
- [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
- [label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
- [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
- [loading lazy](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)

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
- [Cumulative Layout Shift](https://web.dev/articles/cls)2 /
