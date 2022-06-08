"use strict";

/**
 * Constructor function for new Exam objects
 * @param {string} code 
 * @param {string} name
 * @param {number} credits
 * @param {string} max 
 * @param {number} preparation 
 * @param {string} description 
 */
function Exam(code, name, credits, max, preparation, description) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.max = max;
  this.preparation = preparation;
  this.description = description;
}

exports.Exam = Exam;
exports.modules = {Exam};