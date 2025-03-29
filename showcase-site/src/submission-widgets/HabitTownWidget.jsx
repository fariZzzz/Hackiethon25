import React, { useState, useEffect } from "react";
import house1 from "/Users/fariii/Documents/GitHub/Hackiethon25/showcase-site/src/submission-widgets/house-level 1.png";
import house2 from "/Users/fariii/Documents/GitHub/Hackiethon25/showcase-site/src/submission-widgets/house-level 2.png";
import house3 from "/Users/fariii/Documents/GitHub/Hackiethon25/showcase-site/src/submission-widgets/house-level 3.png";
import house4 from "/Users/fariii/Documents/GitHub/Hackiethon25/showcase-site/src/submission-widgets/house-level4.png"; 

const HabitTownWidget = () => {
  const [habitCount, setHabitCount] = useState(0);
  const [goal, setGoal] = useState(""); // For storing the user's goal
  const [goalProgress, setGoalProgress] = useState(0); // For tracking goal progress (0 = not done, 1 = done)
  const [reminderTime, setReminderTime] = useState(""); // User sets reminder time (e.g., 10:00 PM)

  useEffect(() => {
    // Load saved habitCount from localStorage on component mount
    const savedHabitCount = localStorage.getItem("habitCount");
    const savedGoal = localStorage.getItem("goal");
    const savedGoalProgress = localStorage.getItem("goalProgress");
    const savedReminderTime = localStorage.getItem("reminderTime");

    if (savedHabitCount !== null) setHabitCount(Number(savedHabitCount));
    if (savedGoal) setGoal(savedGoal);
    if (savedGoalProgress !== null) setGoalProgress(Number(savedGoalProgress));
    if (savedReminderTime) setReminderTime(savedReminderTime);
  }, []);

  useEffect(() => {
    // Save habitCount and goal progress to localStorage whenever they change
    localStorage.setItem("habitCount", habitCount);
    localStorage.setItem("goal", goal);
    localStorage.setItem("goalProgress", goalProgress);
    localStorage.setItem("reminderTime", reminderTime);
  }, [habitCount, goal, goalProgress, reminderTime]);

  const completeHabit = () => {
    setHabitCount((prev) => Math.min(prev + 1, 4)); // Updated to 4 levels
  };

  const missHabit = () => {
    setHabitCount((prev) => Math.max(prev - 1, 0)); // house collapses if habits are missed
  };

  const getHouseImage = () => {
    if (habitCount === 0) return house1;
    if (habitCount === 1) return house2;
    if (habitCount === 2) return house3;
    return house4; // Return level 4 house if habit count is 4
  };

  // Send reminder at the end of the day before bedtime
  const sendReminder = () => {
    const currentTime = new Date();
    const reminderDate = new Date(reminderTime);

    if (currentTime >= reminderDate) {
      alert("Time to check your goals! Did you complete them?");
      if (goalProgress === 0) {
        missHabit(); // Collapsing house on missed goal
      }
    }
  };

  // UseEffect to check reminder at the right time (daily check)
  useEffect(() => {
    if (reminderTime) {
      const intervalId = setInterval(sendReminder, 60000); // Check every minute
      return () => clearInterval(intervalId); // Clean up interval
    }
  }, [reminderTime]);

  // Handle goal input and progress
  const handleGoalInput = (event) => {
    setGoal(event.target.value);
  };

  const handleGoalCompletion = () => {
    setGoalProgress(1); // Goal completed
  };

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-md dark:bg-zinc-900 transition-all duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Your Habit Home</h2>

      <div className="flex flex-col items-center">
        < img src={getHouseImage()} alt="Your House" className="w-32 h-32 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-2">Habits completed today: {habitCount}/4</p >

        {/* Goal Input Section */}
        <div className="mb-4">
          <input
            type="text"
            value={goal}
            onChange={handleGoalInput}
            placeholder="Enter your goal for today"
            className="px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleGoalCompletion}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ml-2"
          >
            Mark Goal Complete
          </button>
        </div>

        {/* Time Reminder Section */}
        <div className="mb-4">
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
          <span className="ml-2 text-gray-600">Set reminder time</span>
        </div>
      </div>

      
  
    </div>
  );
};

export default HabitTownWidget;