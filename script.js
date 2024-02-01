function toggleInputs() {
    const calculationMethod = document.getElementById('calculationMethod').value;
    const dateInputs = document.getElementById('dateInputFields');
    const lecturesInputs = document.getElementById('lecturesInputFields');

    if (calculationMethod === '1') {
        dateInputs.style.display = 'block';
        lecturesInputs.style.display = 'none';
    } else {
        dateInputs.style.display = 'none';
        lecturesInputs.style.display = 'block';
    }
}

function calculateAttendance() {
    const calculationMethod = document.getElementById('calculationMethod').value;
    const resultArea = document.getElementById('resultArea');
    resultArea.textContent = ''; // Clear previous results

    if (calculationMethod === '1') {
        const n = parseInt(prompt('Enter the total number of days:'), 10);
        const l = parseInt(prompt('Enter the number of lectures each day:'), 10);
        const min = parseInt(prompt('Enter the minimum attendance required:'), 10);

        const miss = n * l;

        const ap = parseInt(prompt('Enter the total lectures attended in the past:'), 10);
        const lp = parseInt(prompt('Enter the total lectures happened in the past:'), 10);

        const attend1 = (ap / lp) * 100;
        const upt = miss + lp;
        const attend = (ap / upt) * 100;

        alert(`Your earlier attendance was ${attend1.toFixed(2)}%\nYour future attendance will be ${attend.toFixed(2)}%`);

        if (attend >= min) {
            const bunk1 = Math.round(Math.abs((ap / min) * 100 - upt));
            alert(`Congrats!! Your attendance is above the minimum required percentage.\nYou can skip below number of lectures to maintain the minimum percentage: ${bunk1}`);
        } else {
            const bunk = Math.round(Math.abs((100 * ap - min * upt) / (min - 100)));
            alert(`Uhh-Ohh!! Your attendance is below the minimum attendance required.\nYou have to attend below number of classes to maintain the minimum required percentage: ${bunk}`);
        }
    } else {
        // Calculate by the number of lectures
        const totalLectures = parseInt(document.getElementById('totalLectures').value) || 0;
        const lecturesAttended = parseInt(document.getElementById('lecturesAttended').value) || 0;
        const percentage = parseInt(document.getElementById('percentage').value) || 75;

        // Placeholder for demonstration purposes
        const present = lecturesAttended;
        const total = totalLectures;

        if (present <= 0 || total <= 0 || present > total) {
            return (resultArea.innerText = "Please Enter correct values");
        }

        if (present / total >= percentage / 100) {
            const daysAvailableToBunk = daysToBunk(present, total, percentage);
            return (resultArea.innerHTML = daysToBunkText(
                daysAvailableToBunk,
                present,
                total
            ));
        }

        const attendanceNeeded = reqAttendance(present, total, percentage);
        return (resultArea.innerHTML = daysToAttendClassText(
            attendanceNeeded,
            present,
            total,
            percentage
        ));
    }
}

const reqAttendance = (present, total, percentage) => {
    return Math.ceil((percentage * total - 100 * present) / (100 - percentage));
};

const daysToBunk = (present, total, percentage) => {
    return Math.floor((100 * present - percentage * total) / percentage);
};

const daysToBunkText = (daysAvailableToBunk, present, total) =>
    `You can leave <strong>${daysAvailableToBunk}</strong> more lectures.<br>Current Attendance: <strong>${present}/${total}</strong> -> <strong>${(
        (present / total) *
        100
    ).toFixed(2)}%</strong><br>Attendance After leaving: <strong>${present}/${
        daysAvailableToBunk + total
    }</strong> -> <strong>${(
        (present / (daysAvailableToBunk + total)) *
        100
    ).toFixed(2)}%</strong>`;

const daysToAttendClassText = (attendanceNeeded, present, total, percentage) =>
    `You need to attend <strong>${attendanceNeeded}</strong> more classes to attain ${percentage}% attendance<br>Current Attendance: <strong>${present}/${total}</strong> ->  <strong>${(
        (present / total) *
        100
    ).toFixed(2)}%</strong><br>Attendance Required: <strong>${
        attendanceNeeded + present
    }/${attendanceNeeded + total}</strong> -> <strong>${(
        ((attendanceNeeded + present) / (attendanceNeeded + total)) *
        100
    ).toFixed(2)}%</strong>`;
