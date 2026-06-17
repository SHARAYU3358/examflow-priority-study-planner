import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import Dashboard from './components/Dashboard';
import StudyPlan from './components/StudyPlan';
import ProgressTracker from './components/ProgressTracker';
import Footer from './components/Footer';

// Scheduling logic helper
const generatePlanFromInputs = (chaptersList, days, hours) => {
  const sortedChapters = [...chaptersList].sort((a, b) => {
    const priorityWeights = { High: 3, Medium: 2, Low: 1 };
    return priorityWeights[b.priority] - priorityWeights[a.priority];
  });

  const plan = [];
  let currentDay = 1;
  let currentDayHoursAssigned = 0;
  let dayTasks = [];

  for (const chapter of sortedChapters) {
    let hoursRemaining = chapter.hoursRequired;

    while (hoursRemaining > 0) {
      const dayCapacity = hours - currentDayHoursAssigned;

      if (dayCapacity <= 0) {
        plan.push({
          day: currentDay,
          tasks: dayTasks
        });
        currentDay++;
        currentDayHoursAssigned = 0;
        dayTasks = [];
        continue;
      }

      const hoursToAssign = Math.min(hoursRemaining, dayCapacity);
      
      dayTasks.push({
        id: `task-${chapter.id}-d${currentDay}-${hoursRemaining}-${hoursToAssign}`,
        chapterId: chapter.id,
        chapterName: chapter.name,
        priority: chapter.priority,
        hours: hoursToAssign,
        completed: false
      });

      hoursRemaining -= hoursToAssign;
      currentDayHoursAssigned += hoursToAssign;

      if (currentDayHoursAssigned === hours) {
        plan.push({
          day: currentDay,
          tasks: dayTasks
        });
        currentDay++;
        currentDayHoursAssigned = 0;
        dayTasks = [];
      }
    }
  }

  if (dayTasks.length > 0) {
    plan.push({
      day: currentDay,
      tasks: dayTasks
    });
  }

  return plan;
};

export default function App() {
  // --- States ---
  const [daysRemaining, setDaysRemaining] = useState(() => {
    const saved = localStorage.getItem('examflow_days_remaining');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [hoursPerDay, setHoursPerDay] = useState(() => {
    const saved = localStorage.getItem('examflow_hours_per_day');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem('examflow_chapters');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Algebra', priority: 'High', hoursRequired: 5 },
      { id: '2', name: 'Geometry', priority: 'Medium', hoursRequired: 3 },
      { id: '3', name: 'Statistics', priority: 'Low', hoursRequired: 2 }
    ];
  });

  const [completedTaskIds, setCompletedTaskIds] = useState(() => {
    const saved = localStorage.getItem('examflow_completed_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [studyPlan, setStudyPlan] = useState(() => {
    const saved = localStorage.getItem('examflow_study_plan');
    if (saved) {
      const parsed = JSON.parse(saved);
      const savedCompleted = localStorage.getItem('examflow_completed_tasks');
      const completedIds = savedCompleted ? JSON.parse(savedCompleted) : [];
      
      // Sync completed flags in the loaded study plan
      return parsed.map(dayPlan => ({
        ...dayPlan,
        tasks: dayPlan.tasks.map(t => ({
          ...t,
          completed: completedIds.includes(t.id)
        }))
      }));
    }
    return null;
  });

  const [errors, setErrors] = useState([]);

  // --- Effects for LocalStorage Synchronization ---
  useEffect(() => {
    localStorage.setItem('examflow_days_remaining', daysRemaining.toString());
  }, [daysRemaining]);

  useEffect(() => {
    localStorage.setItem('examflow_hours_per_day', hoursPerDay.toString());
  }, [hoursPerDay]);

  useEffect(() => {
    localStorage.setItem('examflow_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('examflow_completed_tasks', JSON.stringify(completedTaskIds));
  }, [completedTaskIds]);

  useEffect(() => {
    if (studyPlan) {
      localStorage.setItem('examflow_study_plan', JSON.stringify(studyPlan));
    } else {
      localStorage.removeItem('examflow_study_plan');
    }
  }, [studyPlan]);

  // Generate default plan on first launch if none exists
  useEffect(() => {
    const savedPlan = localStorage.getItem('examflow_study_plan');
    if (!savedPlan) {
      const defaultPlan = generatePlanFromInputs(chapters, daysRemaining, hoursPerDay);
      setStudyPlan(defaultPlan);
    }
  }, []);

  // --- Input Handlers ---
  const handleAddChapter = () => {
    const newChapter = {
      id: `chapter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      priority: 'Medium',
      hoursRequired: 1
    };
    setChapters([...chapters, newChapter]);
  };

  const handleUpdateChapter = (id, field, value) => {
    setChapters(
      chapters.map((ch) => (ch.id === id ? { ...ch, [field]: value } : ch))
    );
  };

  const handleRemoveChapter = (id) => {
    setChapters(chapters.filter((ch) => ch.id !== id));
  };

  // --- Validations ---
  const validateInputs = () => {
    const newErrors = [];
    if (!daysRemaining || daysRemaining <= 0) {
      newErrors.push('Days remaining must be greater than 0');
    }
    if (!hoursPerDay || hoursPerDay <= 0) {
      newErrors.push('Study hours per day must be greater than 0');
    }
    if (chapters.length === 0) {
      newErrors.push('At least one chapter is required');
    }

    chapters.forEach((ch, idx) => {
      const chapterLabel = ch.name.trim() !== '' ? `"${ch.name}"` : `Chapter ${idx + 1}`;
      if (!ch.name || ch.name.trim() === '') {
        newErrors.push(`Chapter ${idx + 1} name cannot be empty`);
      }
      if (ch.hoursRequired === '' || ch.hoursRequired === null || ch.hoursRequired === undefined) {
        newErrors.push(`${chapterLabel} hours required cannot be empty`);
      } else if (ch.hoursRequired <= 0) {
        newErrors.push(`${chapterLabel} minimum hours required must be greater than 0`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // --- Action Handlers ---
  const handleGeneratePlan = () => {
    if (!validateInputs()) {
      return;
    }
    setErrors([]);
    const newPlan = generatePlanFromInputs(chapters, daysRemaining, hoursPerDay);
    setStudyPlan(newPlan);
    setCompletedTaskIds([]); // Reset completed tasks on fresh generation
  };

  const handleResetEverything = () => {
    localStorage.clear();
    setDaysRemaining(5);
    setHoursPerDay(3);
    const defaultChapters = [
      { id: '1', name: 'Algebra', priority: 'High', hoursRequired: 5 },
      { id: '2', name: 'Geometry', priority: 'Medium', hoursRequired: 3 },
      { id: '3', name: 'Statistics', priority: 'Low', hoursRequired: 2 }
    ];
    setChapters(defaultChapters);
    setCompletedTaskIds([]);
    setErrors([]);
    
    // Automatically regenerate standard plan based on defaults
    const defaultPlan = generatePlanFromInputs(defaultChapters, 5, 3);
    setStudyPlan(defaultPlan);
  };

  const handleToggleTask = (taskId) => {
    let updatedIds;
    if (completedTaskIds.includes(taskId)) {
      updatedIds = completedTaskIds.filter((id) => id !== taskId);
    } else {
      updatedIds = [...completedTaskIds, taskId];
    }
    setCompletedTaskIds(updatedIds);

    if (studyPlan) {
      const updatedPlan = studyPlan.map((dayPlan) => ({
        ...dayPlan,
        tasks: dayPlan.tasks.map((t) => {
          if (t.id === taskId) {
            return { ...t, completed: !t.completed };
          }
          return t;
        })
      }));
      setStudyPlan(updatedPlan);
    }
  };

  // --- Metrics Calculation ---
  const totalChapters = chapters.length;
  const totalHoursNeeded = chapters.reduce((sum, ch) => sum + (ch.hoursRequired || 0), 0);
  const totalAvailableHours = (daysRemaining || 0) * (hoursPerDay || 0);

  let completedTasksCount = 0;
  let remainingTasksCount = 0;
  let progressPercentage = 0;

  if (studyPlan && studyPlan.length > 0) {
    studyPlan.forEach((dayPlan) => {
      dayPlan.tasks.forEach((t) => {
        if (t.completed) {
          completedTasksCount++;
        } else {
          remainingTasksCount++;
        }
      });
    });
    const totalTasks = completedTasksCount + remainingTasksCount;
    progressPercentage = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;
  }

  return (
    <div className="container">
      {/* Title & Header */}
      <Header />

      {/* Dashboard Section */}
      <Dashboard
        totalChapters={totalChapters}
        totalHoursNeeded={totalHoursNeeded}
        totalAvailableHours={totalAvailableHours}
        completionPercentage={progressPercentage}
        isPlanGenerated={!!studyPlan && studyPlan.length > 0}
      />

      {/* Input Parameters Section */}
      <InputSection
        daysRemaining={daysRemaining}
        hoursPerDay={hoursPerDay}
        chapters={chapters}
        errors={errors}
        onChangeDays={setDaysRemaining}
        onChangeHours={setHoursPerDay}
        onAddChapter={handleAddChapter}
        onUpdateChapter={handleUpdateChapter}
        onRemoveChapter={handleRemoveChapter}
        onGeneratePlan={handleGeneratePlan}
        onResetEverything={handleResetEverything}
      />

      {/* Study Plan Section */}
      <StudyPlan
        studyPlan={studyPlan}
        daysRemaining={daysRemaining}
        totalHoursNeeded={totalHoursNeeded}
        totalAvailableHours={totalAvailableHours}
        onToggleTask={handleToggleTask}
      />

      {/* Progress Tracker Section */}
      <ProgressTracker
        completedTasksCount={completedTasksCount}
        remainingTasksCount={remainingTasksCount}
        progressPercentage={progressPercentage}
        isPlanGenerated={!!studyPlan && studyPlan.length > 0}
      />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
