const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");
const categories = document.querySelector(".categories");
createCategories(CATEGORIES);
const catBtn = document.querySelectorAll(".btn-category");
const allCatBtn = document.querySelector(".btn-all-categories");
// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
  try {
    const res = await fetch(
      "https://vqowcrdmlcsazewtlgfk.supabase.co/rest/v1/facts",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb3djcmRtbGNzYXpld3RsZ2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2ODA4NTIsImV4cCI6MjAwNTI1Njg1Mn0.a2SOuihbHaDNsJDPar2l0Yf0bPqOazvSlNOK4dhGqzg",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb3djcmRtbGNzYXpld3RsZ2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2ODA4NTIsImV4cCI6MjAwNTI1Njg1Mn0.a2SOuihbHaDNsJDPar2l0Yf0bPqOazvSlNOK4dhGqzg",
        },
      }
    );
    const data = await res.json();
    // const filtered = data.filter((fact) => fact.category === "technology");
    createFactList(data);
    filtering(data);
    refilterToAllCategories(data);
  } catch (err) {
    console.log(err);
  }
}
// createFactList(initialFacts);
function createFactList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `
    <li class="fact">
      <p>
      ${fact.text}
      <a class="source" href="${fact.source}" target="_blank">(source)</a>
      </p>
      <span class="tag" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      };">${fact.category}</span>
    </li>
    `
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

function createCategories(dataArray) {
  categories.innerHTML = "";
  const html = dataArray
    .map(
      (cat) => `
      <li class="category">
        <button class="btn btn-category" style="background-color: ${cat.color};">${cat.name}</button>
      </li>
  `
    )
    .join("");
  categories.insertAdjacentHTML("afterbegin", html);
}

// Filtering
function filtering(facts) {
  catBtn.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      const clicked = e.target.textContent;
      const filtered = facts.filter((el) => el.category === clicked);
      factsList.innerHTML = "";
      createFactList(filtered);
    })
  );
}
function refilterToAllCategories(allFact) {
  allCatBtn.addEventListener("click", function () {
    factsList.innerHTML = "";
    createFactList(allFact);
  });
}

// Toggle form visibility
btn.addEventListener("click", function (e) {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
