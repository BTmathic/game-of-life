# game-of-life
<h1>Game of Life</h1>

Simple version of Conway's Game of Life built with React. Start, pause and clear functionality as well as manually editting what tiles are on or off by mouse click. Three speeds available to watch the systems evolve, as well as six preset patterns to see different life cycles that exist.

We wrap the edges around so that our grid is not infinite in size, which means none of the interesting (but not visible on a finite screen!) infinite growth patterns are possible, but this allows for collisions from one side to another that add a degree of unknown to the more stable patterns, such as the glider gun.

For more information on the Game of Life, including the rules depicting the population changes, see for example <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Wikipedia</a>.

<h3>Built with</h3>
<ul>
  <li>React</li>
  <li>Webpack</li>
  <li>Yarn</li>
</ul>

To run, load index.html in the public folder.
