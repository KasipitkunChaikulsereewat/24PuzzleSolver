

const solutionText = document.getElementById('solution-text');
const cautionText = document.getElementById('caution');

function sort(a, b, c, d) {
    const arr = [a, b, c, d];
    arr.sort((x, y) => y - x);
    return arr;
}

function findSolution(a, b, c, d) {
    const showAllCheckbox = document.getElementById('showAll');
    const ops = ['+', '-', '*', '/'];
    let cases = [];
    for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < ops.length; j++) {
            for (let k = 0; k < ops.length; k++) {
                cases.push(`((${a} ${ops[i]} ${b}) ${ops[j]} ${c}) ${ops[k]} ${d}`);
                cases.push(`(${a} ${ops[i]} (${b} ${ops[j]} ${c})) ${ops[k]} ${d}`);
                cases.push(`(${a} ${ops[i]} ${b}) ${ops[j]} (${c} ${ops[k]} ${d})`);
                cases.push(`${a} ${ops[i]} ((${b} ${ops[j]} ${c}) ${ops[k]} ${d})`);
                cases.push(`${a} ${ops[i]} (${b} ${ops[j]} (${c} ${ops[k]} ${d}))`);

                cases.push(`((${b} ${ops[i]} ${c}) ${ops[j]} ${a}) ${ops[k]} ${d}`);
                cases.push(`(${b} ${ops[i]} (${c} ${ops[j]} ${a})) ${ops[k]} ${d}`);
                cases.push(`(${b} ${ops[i]} ${c}) ${ops[j]} (${a} ${ops[k]} ${d})`);
                cases.push(`${b} ${ops[i]} ((${c} ${ops[j]} ${a}) ${ops[k]} ${d})`);
                cases.push(`${b} ${ops[i]} (${c} ${ops[j]} (${a} ${ops[k]} ${d}))`);

                cases.push(`((${a} ${ops[i]} ${c}) ${ops[j]} ${b}) ${ops[k]} ${d}`);
                cases.push(`(${a} ${ops[i]} (${c} ${ops[j]} ${b})) ${ops[k]} ${d}`);
                cases.push(`(${a} ${ops[i]} ${c}) ${ops[j]} (${b} ${ops[k]} ${d})`);
                cases.push(`${a} ${ops[i]} ((${c} ${ops[j]} ${b}) ${ops[k]} ${d})`);
                cases.push(`${a} ${ops[i]} (${c} ${ops[j]} (${b} ${ops[k]} ${d}))`);

                cases.push(`((${c} ${ops[i]} ${b}) ${ops[j]} ${a}) ${ops[k]} ${d}`);
                cases.push(`(${c} ${ops[i]} (${b} ${ops[j]} ${a})) ${ops[k]} ${d}`);
                cases.push(`(${c} ${ops[i]} ${b}) ${ops[j]} (${a} ${ops[k]} ${d})`);
                cases.push(`${c} ${ops[i]} ((${b} ${ops[j]} ${a}) ${ops[k]} ${d})`);
                cases.push(`${c} ${ops[i]} (${b} ${ops[j]} (${a} ${ops[k]} ${d}))`);

                cases.push(`((${a} ${ops[i]} ${b}) ${ops[j]} ${d}) ${ops[k]} ${c}`);
                cases.push(`(${a} ${ops[i]} (${b} ${ops[j]} ${d})) ${ops[k]} ${c}`);
                cases.push(`(${a} ${ops[i]} ${b}) ${ops[j]} (${d} ${ops[k]} ${c})`);
                cases.push(`${a} ${ops[i]} ((${b} ${ops[j]} ${d}) ${ops[k]} ${c})`);
                cases.push(`${a} ${ops[i]} (${b} ${ops[j]} (${d} ${ops[k]} ${c}))`);

                cases.push(`((${a} ${ops[i]} ${c}) ${ops[j]} ${d}) ${ops[k]} ${b}`);
                cases.push(`(${a} ${ops[i]} (${c} ${ops[j]} ${d})) ${ops[k]} ${b}`);
                cases.push(`(${a} ${ops[i]} ${c}) ${ops[j]} (${d} ${ops[k]} ${b})`);
                cases.push(`${a} ${ops[i]} ((${c} ${ops[j]} ${d}) ${ops[k]} ${b})`);
                cases.push(`${a} ${ops[i]} (${c} ${ops[j]} (${d} ${ops[k]} ${b}))`);
            }
        }
    }
    let solutions = [];
    for (let i = 0; i < cases.length; i++) {   
        try {
            if (eval(cases[i]) === 24) {
                solutions.push(cases[i]);
                if (!showAllCheckbox.checked) {
                    displaySolution(solutions[0]);
                    return;
                }
            } else if (Math.abs(eval(cases[i])) === 24){
                solutions.push(`|${cases[i]}|`);
                cautionText.style.display = "block";
                if (!showAllCheckbox.checked) {
                    displaySolution(solutions[0]);
                    return;
                }
            }
            }
        catch (e) {
            // Handle any errors that may occur during evaluation
            window.alert("Error evaluating expression: " + cases[i], e);
            break;
        }
        if (solutions.length > 0) {
            displaySolution(solutions);
        } else {
            displaySolution(null);
        }
    }
}
    

function displaySolution(solution) {
    if (Array.isArray(solution)) {
        solutionText.textContent = solution.map((s, i) => `${i + 1}. ${s}`).join('\n');
    } else if (solution) {
        solutionText.textContent = `${solution}`;
    } else {
        solutionText.textContent = "No solution found.";
    }
}

const findSolutionButton = document.getElementById('find_solution');

findSolutionButton.onclick = function(event) {
    event.preventDefault();
    const num1 = Number(document.getElementById('input1').value);
    const num2 = Number(document.getElementById('input2').value);
    const num3 = Number(document.getElementById('input3').value);
    const num4 = Number(document.getElementById('input4').value);
    
    findSolution(...sort(num1, num2, num3, num4));
}


const resetButton = document.getElementById('reset-button');
resetButton.onclick = function() {
    document.getElementById('game-form').reset();
    solutionText.textContent = "";
    cautionText.style.display = "none";
}
