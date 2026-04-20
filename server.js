// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";

console.log("Server Gestart");
// Doe een fetch naar de data die je nodig hebt
const documentData = await fetch(
  "https://fdnd-agency.directus.app/items/adconnect_documents",
);
const eventData = await fetch(
  "https://fdnd-agency.directus.app/items/adconnect_events",
);

const awardData = await fetch(
  "https://fdnd-agency.directus.app/items/adconnect_nominations",
);

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const documentDataJSON = await documentData.json();
const eventDataJSON = await eventData.json();
const awardDataJSON = await awardData.json();

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get("/", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      title: "Het landelijke platform voor associate degrees",
      text: "Ad-netwerk samen om kennis te delen, samen te werken en de kwaliteit en zichtbaarheid van Associate degrees te versterken.",
      headeritem1: "FAQ's",
      headeritem2: "Over ons",
      headeritem3: "Contact",
      scndheaderitem1: "Home",
      scndheaderitem2: "Over Ad's",
      scndheaderitem3: "Publicaties",
      scndheaderitem4: "Talentaward",
      scndheaderitem5: "Nieuws",
      scndheaderitem6: "Kom naar Ad-dag",
      nieuwsitem1: "Landelijke Ad Dag",
      nieuwsitem2: "Dit is een test in principe",
      nieuwsitem3: "Workshop Ad'ers zijn doeners!",
      nieuwsdiscription1:
        "Dit schooljaar vindt de landelijke Ad-dag plaats op vrijdag 17 april 2026!",
      nieuwsdiscription2: "Hopelijk werkt dit?",
      nieuwsdiscription3:
        "De Ad-dag is een iniatief vanuit het Overlegplatform Associatedegrees. De vijfde...",

      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("index.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});

app.get("/Ad-dag", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("AD-dag.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});

app.get("/Overons", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("Overons.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});

app.get("/talentaward", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      headeritem1: "FAQ's",
      headeritem2: "Over ons",
      headeritem3: "Contact",
      scndheaderitem1: "Home",
      scndheaderitem2: "Over Ad's",
      scndheaderitem3: "Publicaties",
      scndheaderitem4: "Talentaward",
      scndheaderitem5: "Nieuws",
      scndheaderitem6: "Kom naar Ad-dag",
    },
  };

  const talentData = {
    introtitle: "AD TALENT AWARD 2026",
    introtext:
      "Tijdens de Landelijke Ad-dag op 17 april 2026 bij de Hanze in Groningen worden de Ad Talent Awards 2026 uitgereikt. Twee Ad Talenten worden op deze dag benoemd tot landelijke ambassadeurs van het Ad-onderwijs: één ambassadeur voor voltijd en één voor deeltijd/duaal. Elke hogeschool aangesloten bij het Overlegplatform Associate degrees kon hiervoor één Ad Talent nomineren. Op deze pagina stellen we alle genomineerde Ad Talenten aan jullie voor.",
    categorie: "2",
    typeopleiding: "Voltijd & Deeltijd/duaal",
    genomineerde: "6",
    hogescholen: "Van 6 hogescholen",
    uitreikingsdatum: "17 april 2026",
    uitreikingsloca: "Hanze, Groningen",
  };

  response.render("Talentaward.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    students: awardDataJSON.data,
    talentData: talentData,
  });
});

app.get("/Talentaward/student/:title", async function (request, response) {
  const studentTitle = decodeURIComponent(request.params.title);

  // Zoek eerst de student
  const student = awardDataJSON.data.find((s) => s.title === studentTitle);
  // Haal de comments op
  const commentsData = await fetch(
    `https://fdnd-agency.directus.app/items/adconnect_nominations_comments?filter[nomination]=${student.id}`,
  );
  const commentsDataJSON = await commentsData.json();

  const extraData = {
    homepageHeader: {
      headeritem1: "FAQ's",
      headeritem2: "Over ons",
      headeritem3: "Contact",
      scndheaderitem1: "Home",
      scndheaderitem2: "Over Ad's",
      scndheaderitem3: "Publicaties",
      scndheaderitem4: "Talentaward",
      scndheaderitem5: "Nieuws",
      scndheaderitem6: "Kom naar Ad-dag",
    },
  };

  response.render("student.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    students: awardDataJSON.data,
    studentTitle: studentTitle,
    comments: commentsDataJSON.data,
    success: request.query.success === "true",
  });
});

app.get("/Contact", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("contact.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});

app.get("/Over-Ads", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("Over-Ads.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});
app.get("/Over-Ads/FAQ", async function (request, response) {
  // Data ophalen uit Directus

  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("FAQ.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});

app.get("/Nieuws", async function (request, response) {
  const newsresponse = await fetch(
    "https://fdnd-agency.directus.app/items/adconnect_news",
  );
  const newsJSON = await newsresponse.json();
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      title: "Het landelijke platform voor associate degrees",
      text: "Ad-netwerk samen om kennis te delen, samen te werken en de kwaliteit en zichtbaarheid van Associate degrees te versterken.",
      headeritem1: "FAQ's",
      headeritem2: "Over ons",
      headeritem3: "Contact",
      scndheaderitem1: "Home",
      scndheaderitem2: "Over Ad's",
      scndheaderitem3: "Publicaties",
      scndheaderitem4: "Talentaward",
      scndheaderitem5: "Nieuws",
      scndheaderitem6: "Kom naar Ad-dag",
      nieuwsitem1: "Landelijke Ad Dag",
      nieuwsitem2: "Dit is een test in principe",
      nieuwsitem3: "Workshop Ad'ers zijn doeners!",
      nieuwsdiscription1:
        "Dit schooljaar vindt de landelijke Ad-dag plaats op vrijdag 17 april 2026!",
      nieuwsdiscription2: "Hopelijk werkt dit?",
      nieuwsdiscription3:
        "De Ad-dag is een iniatief vanuit het Overlegplatform Associatedegrees. De vijfde...",

      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("nieuws.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
    nieuws: newsJSON.data,
  });
});

app.get("/Publicaties", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const extraData = {
    homepageHeader: {
      buttons: [
        {
          url: "#bla",
          text: "Meer over Ad's",
        },
        {
          url: "#bla",
          text: "Kom naar de AD-dag >",
        },
      ],
    },
  };

  response.render("publicaties.liquid", {
    title: "Home",
    extraData: extraData,
    documents: documentDataJSON.data,
    events: eventDataJSON,
  });
});

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post("/", async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, "/");
});

app.post(
  "/Talentaward/student/:title/comment",
  async function (request, response) {
    const studentTitle = decodeURIComponent(request.params.title);
    const { message, afzender } = request.body;

    const student = awardDataJSON.data.find((s) => s.title === studentTitle);
    // Validatie
    const errors = [];
    if (!message) errors.push("message");
    if (!afzender) errors.push("afzender");

    if (errors.length > 0) {
      // Zelfde data ophalen als GET route
      const commentsData = await fetch(
        `https://fdnd-agency.directus.app/items/adconnect_nominations_comments?filter[nomination]=${student.id}`,
      );
      const commentsDataJSON = await commentsData.json();

      const extraData = {
        homepageHeader: {
          headeritem1: "FAQ's",
          headeritem2: "Over ons",
          headeritem3: "Contact",
          scndheaderitem1: "Home",
          scndheaderitem2: "Over Ad's",
          scndheaderitem3: "Publicaties",
          scndheaderitem4: "Talentaward",
          scndheaderitem5: "Nieuws",
          scndheaderitem6: "Kom naar Ad-dag",
        },
      };

      return response.render("student.liquid", {
        title: "Home",
        extraData: extraData,
        documents: documentDataJSON.data,
        students: awardDataJSON.data,
        studentTitle: studentTitle,
        comments: commentsDataJSON.data,
        submitted: true,
        errors: errors,
        form: {
          message: message || "",
          afzender: afzender || "",
        },
      });
    }

    // Alles ingevuld → stuur naar API
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
// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
