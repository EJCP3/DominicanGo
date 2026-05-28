import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip.js';
console.log("Before register");
try {
  gsap.registerPlugin(Flip);
  console.log("Success");
} catch (e) {
  console.error("Error:", e);
}
