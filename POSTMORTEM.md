# Approach and Process

## Approach Evaluation

**My Approach**
- **Step 0**: Came up with plan A, B, C
- **Step 1**: Set up the base and make sure all parts (FE & BE) were properly connected
- **Step 2**: Executed plan A, but it failed - apparently i didnt even have enough time to execute plan A.
- **Step 3**: Replanned and rescoped and came up with another timeline, with clear deliverables for each day. Prioritise the features within each component: the Must-have vs the Good-to-have. E.g. I wanted to try different libraries for fuzzy search, email alerts; I also wanted to show different views to different types of users (e.g super-admin, normal-admin), but i decided that they were not super crucial for a functional version of the app and thus should not be part of my tight timeline.
- **Step 4**: Coded consistently everyday, and tried my best to achieve the deliverables. 60% of the days I managed to achieve what I set out, and that was okay to me - I decided to simply adjust my  plan and scope according to my own daily progress (or the lack of it)

**What went well**
- I thought I really couldn't finish because by the time I started coding everyday, it was already 9PM (sobs). But flexibly rescoping the project along the way, and reprioritising accordingly really helped with the project completion. 
- It is good to refactor the codes once every 1 or 2 days.

**What I would do differently next time**
- probably find a way to make repo methods neater and faster
- have a centralised config folder/files for all components that can be defined by the admin (e.g. age group naming, region naming, calendar, etc)


## Code Design Evaluation

**My Code Design**
- Each code file serves a single purpose
- Main codes are placed within the file, but any helper steps in between will be placed in a helper file
- Complex feature like roster required a little more thinking (1) FE send back filtered data only (2) keep the repo and its data structure simple (3) send only rostered data to the front end (4) ejs code were kept straightforward and used to render the structure only (5) matching of data to the existing structure rendered by ejs was handled by jQuery.

**What I would do differently next time**
- Try ajax next time


## Unit 1 Evaluation

**Good Habits**
- Refactoring
- Work with objects
- Build gradually. Take it one step at a time. 
- When stuck, ALWAYS go back to the basic. It is often the basic that will be keys to the problem
- Function and variable naming should do half of the job in explaning what the function does. Over-reliance on comments makes the code base looks disjointed.
- Use console to learn

**To Improve**
- code efficiency. but I'm not sure how also.