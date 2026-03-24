let a, b, answer, score = 0;

function generateProblem() {
    do {
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * 9) + 1;
    } while (a + b > 20);
    answer = a + b;
    document.getElementById('problem').textContent = `${a} + ${b} = ?`;
}

function flashColor(color) {
    const input = document.getElementById('numberInput');
    input.style.backgroundColor = color;
    setTimeout(() => {
        input.style.backgroundColor = '';
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    generateProblem();

    document.getElementById('numberInput').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    document.getElementById('numberInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const userAnswer = parseInt(this.value);
            if (userAnswer === answer) {
                score++;
                document.getElementById('score').textContent = `Score: ${score}`;
                flashColor('lightgreen');
                generateProblem();
                this.value = '';
            } else {
                flashColor('lightcoral');
                this.value = '';
            }
        }
    });
});