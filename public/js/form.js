/*Program Title: public/js/form.js
Author: Kathy Chowaniec
Course: CS546-WS
Date: 07/20/2016
Description:
This module exports the validation and computation methods for the text manipulation functionality for the client page. 
*/

(function () {
    let formMethods = {
        //check if text exists and is of correct type
        checkText: function (text) {
            if (!text || typeof text !== "string") throw "Must provide text";
            return text;
        },
        //check if input string exists and is of correct type
        checkInput: function (input) {
            if (!input || typeof input !== "string") throw "Must provide input string";
            return input;
        },
        //check if first number exists, is of correct type, and is within bounds (1-25)
        checkNumInsert: function (num) {
            if (typeof num !== "number") throw "Must provide a number";
            if (isNaN(num)) throw "Must provide a number";
            if (num < 1 || num > 25) throw "Number must be between 1 and 25";
            return num;
        },
        //check if second number exists, is of correct type, and is within bounds (1-25)
        checkNumBetween: function (num) {
            if (typeof num !== "number") throw "Must provide a number";
            if (isNaN(num)) throw "Must provide a number";
            if (num < 1 || num > 25) throw "Number must be between 1 and 25";
            return num;
        },
        //method to insert input string into text as specified by user input
        insertStringIntoText(content, input, insert, between) {
            content = formMethods.checkText(content);
            input = formMethods.checkInput(input);
            insert = formMethods.checkNumInsert(insert);
            between = formMethods.checkNumBetween(between);

            let index = 0;
            let temp = 0;
            //loops for number of times string to be inserted
            for (var i = 0; i < insert; i++) {
                //loops for each character between current position in text and position where next string is to be inserted
                for (var j = index; j <= index + between; j++) {
                    temp = j; //keep track of current position
                }
                index = temp;
                //create substring of text from beginning until current position, inserted string, and remaining text
                content = content.substr(0, index) + input + content.substr(index);
                index = index + input.length; //advance to next position
            }

            return content; //return modified content
        }
    };

    var staticForm = document.getElementById("static-form");

    if (staticForm) {

        //get corresponding elements for each input
        var textElement = document.getElementById("content");
        var inputElement = document.getElementById("input-string");
        var numInsertElement = document.getElementById("num-insert");
        var numBetweenElement = document.getElementById("num-between");

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        //add event listener for form submission 
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");


                var content = textElement.value;
                var inputString = inputElement.value;
                var insertValue = numInsertElement.value;
                var betweenValue = numBetweenElement.value;

                //parse numbers to int values
                var parsedInsertValue = parseInt(insertValue);
                var parsedBetweenValue = parseInt(betweenValue);

                var result = formMethods.insertStringIntoText(content, inputString, parsedInsertValue, parsedBetweenValue);

                //pass result
                resultTextElement.textContent = "Output: " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) { //error occurred
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();