# etch-a-sketch

A browser version of something between a sketchpad and an Etch-A-Sketch.

(1) Create a webpage with a 16x16 grid of square divs
    - Create the divs using JavaScript. Don’t try making them by hand with copy and pasting in your HTML file!
    - It’s best to put your grid squares inside another “container” div (which can go directly in your HTML).
    - You need to make the divs appear as a grid (versus just one on each line). This is a perfect opportunity to apply what you have learned about flexbox.
    - Be careful with borders and margins, as they can adjust the size of the squares!

(2) Set up a "hover" effect so that the grid divs change color when 
your mouse passes over them, leaving a (pixelated) trail through your
grid like a pen would.

(3) Add a button to the top of the screen that will send the user a popup asking for the number of squares per side for the new grid. Once entered, the existing grid should be removed and a new grid should be generated in the same total space as before (e.g. 960px wide) so that you’ve got a new sketch pad. Tip: Set the limit for the user input to a maximum of 100. A larger number of squares results in more computer resources being used, potentially causing delays, freezing, or crashing that we want to prevent.

Extra Commands 

- Rather than a simple color change from black to white, each interaction should randomize the square’s RGB value entirely.

- Additionally, implement a progressive darkening effect where each interaction adds 10% more black or color to the square. The objective is to achieve a completely black square only after ten interactions.