#  ExamFlow – Priority-Based Study Planner

ExamFlow is a simple productivity tool that helps students create a balanced study schedule before exams.

Instead of manually deciding what to study each day, users can add their chapters, assign priorities, specify the minimum hours required, and automatically generate a personalized study plan.

The application also includes progress tracking, a dashboard overview, and persistent storage using the browser's localStorage.

##  Live Demo

examflow-priority-study-planner-6gycsqzop.vercel.app 

##

---

## ✨ Features

* 📅 Generate a study plan based on available days
* 🔥 Prioritize chapters (High, Medium, Low)
* ⏱️ Assign minimum study hours required for each chapter
* 📊 Dashboard with study statistics
* ✅ Track completed study tasks
* 📈 Visual progress tracker
* 💾 Auto-save using browser localStorage
* 📱 Fully responsive design for mobile and desktop
* 🎯 Clean and intuitive user interface

---

## 🛠️ Built With

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* Browser localStorage
* Vercel (Deployment)

---

## 🧠 How It Works

1. Enter the number of days remaining before your exam.
2. Enter how many hours you can study each day.
3. Add chapters.
4. Assign a priority to each chapter.
5. Specify the minimum hours required.
6. Click **Generate Study Plan**.
7. Follow the generated schedule and track your progress.

---

## 📊 Scheduling Logic

The application uses a simple priority-based scheduling approach.

Priority weights:

* High = 3
* Medium = 2
* Low = 1

Process:

1. Chapters are sorted by priority.
2. Available study hours are calculated.
3. Study sessions are distributed across available days.
4. Progress is updated as tasks are completed.

---

## 💡 Why I Built This

During exam preparation, I often manually prioritized difficult chapters and split them across the remaining days.

I wanted a simpler way to automatically create a study schedule and track progress in one place, so I built ExamFlow.

---

## 🖥️ Local Development

Clone the repository:

```bash
git clone https://github.com/SHARAYU3358/examflow-priority-study-planner.git
```

Navigate into the project:

```bash
cd examflow-priority-study-planner
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🌐 Deployment

This project is deployed using Vercel's free Hobby plan.

---

## 👨‍💻 Author

SHARAYU TATHE

📧 [sharayutathe@gmail.com](mailto:sharayutathe@gmail.com)

---

## 🔗 Project Requirement

This project was built as part of a practical software development assessment that focused on building, deploying, and shipping a complete working product using free tools and modern development workflows.
