const navbarBtn = document.querySelector("#hamburger");
const navbarLinks = document.querySelector("ul"); // ul is bad practice!

navbarBtn.addEventListener("click", function () {
  let value = navbarLinks.classList.contains("ul__collapse");
  if (value) {
    navbarLinks.classList.remove("ul__collapse");
  } else {
    navbarLinks.classList.add("ul__collapse");
  }
});

const todoList = document.querySelector("#todo-list");
const todoForm = document.querySelector("#todo-form");
const goalForm = document.querySelector("#goal-form");
const goalList = document.querySelector("#goal-list");
const userName = document.querySelector("#userName").textContent;
const user = userName.toLowerCase();

// Create element and render Todo //

function renderTodo(doc) {
  let ul = document.createElement("ul");
  let record = document.createElement("li");
  let course = document.createElement("li");
  let zone = document.createElement("li");
  let host = document.createElement("li");
  let cross = document.createElement("div");

  ul.setAttribute("data-id", doc.id);
  record.textContent = doc.data().record;
  course.textContent = doc.data().course;
  zone.textContent = doc.data().zone;
  host.textContent = doc.data().host;
  cross.textContent = "x";

  ul.appendChild(record);
  ul.appendChild(course);
  ul.appendChild(zone);
  ul.appendChild(host);
  ul.appendChild(cross);

  todoList.appendChild(ul);

  // Deleting Data //
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("/users/" + user + "/profile/apps/todo list")
      .doc(id)
      .delete();
  });
}

// Get Data //

// db.collection("/users/orson/profile-apps/todo list/todo list").get().then((snapshot) => {
// console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         renderTodo(doc);
//     });
// });

// real-time listener

db.collection("/users/" + user + "/profile/apps/todo list").onSnapshot(
  (snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderTodo(change.doc);
      } else if (change.type == "removed") {
        let li = todoList.querySelector("[data-id=" + change.doc.id + "]");
        todoList.removeChild(li); // shouldn't this be the main ul? why would only one li child be removed here?
      }
    });
  }
);

// Save Data //

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("/users/" + user + "/profile/apps/todo list").add({
    record: todoForm.record.value,
    course: todoForm.course.value,
    zone: todoForm.zone.value,
    host: todoForm.host.value,
  });
});

// Goals //

// Create element and render Todo //

function renderGoal(doc) {
  let ul = document.createElement("ul");
  let record = document.createElement("li");
  let course = document.createElement("li");
  let zone = document.createElement("li");
  let host = document.createElement("li");
  let cross = document.createElement("div");

  ul.setAttribute("data-id", doc.id);
  record.textContent = doc.data().record;
  course.textContent = doc.data().course;
  zone.textContent = doc.data().zone;
  host.textContent = doc.data().host;
  cross.textContent = "x";

  ul.appendChild(record);
  ul.appendChild(course);
  ul.appendChild(zone);
  ul.appendChild(host);
  ul.appendChild(cross);

  goalList.appendChild(ul);

  // Deleting Data //
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("/users/" + user + "/profile/apps/goal list")
      .doc(id)
      .delete();
  });
}

// real-time listener

db.collection("/users/" + user + "/profile/apps/goal list").onSnapshot(
  (snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderGoal(change.doc);
      } else if (change.type == "removed") {
        let li = todoList.querySelector("[data-id=" + change.doc.id + "]");
        goalList.removeChild(li);
      }
    });
  }
);

// Save Data

goalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("/users/" + user + "/profile/apps/goal list").add({
    record: goalForm.record.value,
    course: goalForm.course.value,
    zone: goalForm.zone.value,
    host: goalForm.host.value,
  });
});
