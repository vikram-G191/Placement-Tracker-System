function submitApplication() {

    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const companyName = document.getElementById('companyName').value;

    if (name.trim() === '' || rollNo.trim() === '' || (companyName === 'SelectCompany')) {
        alert('Please fill in all required fields.');
        return false; // Prevent form submission
    }

    if (companyName === "Other") {
        const otherCompanyName = document.getElementById("otherCompanyName").value;
        if (otherCompanyName.trim() === '') {
            alert("Please Enter the company name")
            return false;
        }

        const application = {
            name: name,
            rollNo: rollNo,
            companyName: otherCompanyName,
            status: 'Pending'
        };
        const existingApplications = JSON.parse(localStorage.getItem('applications')) || [];

        existingApplications.push(application);
        localStorage.setItem('applications', JSON.stringify(existingApplications));

        document.getElementById('jobApplicationForm').reset();
        alert('Application submitted successfully!');

        displayApplications();
        displaySelectedStudents();
        updateApplicationStatus();

    }
    else {
        const application = {
            name: name,
            rollNo: rollNo,
            companyName: companyName,
            status: 'Pending'
        };
        const existingApplications = JSON.parse(localStorage.getItem('applications')) || [];

        existingApplications.push(application);
        localStorage.setItem('applications', JSON.stringify(existingApplications));

        document.getElementById('jobApplicationForm').reset();
        alert('Application submitted successfully!');
        displayApplications();
        displaySelectedStudents();
        updateApplicationStatus();
    }
}



function updateApplicationStatus() {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    document.getElementById('numberOfApplications').textContent = applications.length;
    updateSelectedNotSelectedCount();
}


function displayApplications() {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const applicationsBody = document.getElementById('applicationsBody');

    applicationsBody.innerHTML = '';
    applications.forEach((application, index) => {
        const row = applicationsBody.insertRow();
        row.insertCell(0).textContent = application.name;
        row.insertCell(1).textContent = application.rollNo;
        row.insertCell(2).textContent = application.companyName;
        row.insertCell(3).textContent = application.status;

        const select = document.createElement('select');
        const options = ['Pending', 'Selected', 'Not Selected'];
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });

        select.addEventListener('change', function () {
            updateStatus(index, this.value);
        });

        const actionCell = row.insertCell(4);
        actionCell.appendChild(select);
    });
}
displayApplications();

displaySelectedStudents();




function updateStatus(index, newStatus) {

    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications[index].status = newStatus;
    localStorage.setItem('applications', JSON.stringify(applications));
    displayApplications();
    updateApplicationStatus();
    updateSelectedNotSelectedCount();
    displaySelectedStudents();
    displayNotSelectedStudents();
}




function updateSelectedNotSelectedCount() {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    // Filter applications for selected students
    const selectedStudents = applications.filter(application => application.status === 'Selected').length;
    // Filter applications for not selected students
    const notSelectedStudents = applications.filter(application => application.status === 'Not Selected').length;
    document.getElementById('numberOfSelectedStudents').textContent = selectedStudents;
    document.getElementById('numberOfNotSelectedStudents').textContent = notSelectedStudents;
}

function displaySelectedStudents() {

    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const selectedStudentsBody = document.getElementById('selectedStudentsBody');
    selectedStudentsBody.innerHTML = '';
    const selectedStudents = applications.filter(application => application.status === 'Selected');
    selectedStudents.forEach(application => {
        const row = selectedStudentsBody.insertRow();
        row.insertCell(0).textContent = application.name;
        row.insertCell(1).textContent = application.rollNo;
        row.insertCell(2).textContent = application.companyName;
        row.insertCell(3).textContent = application.status;
    });

    displayNotSelectedStudents();
}

function displayNotSelectedStudents() {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const notSelectedStudentsBody = document.getElementById('notSelectedStudentsBody');
    notSelectedStudentsBody.innerHTML = '';
    const notSelectedStudents = applications.filter(application => application.status === 'Not Selected');
    notSelectedStudents.forEach(application => {
        const row = notSelectedStudentsBody.insertRow();
        row.insertCell(0).textContent = application.name;
        row.insertCell(1).textContent = application.rollNo;
        row.insertCell(2).textContent = application.companyName;
        row.insertCell(3).textContent = application.status;
    });
}

displaySelectedStudents();
displayNotSelectedStudents();

function handleCompanySelection(selectElement) {
    var selectedValue = selectElement.value;
    var otherCompanyNameContainer = document.getElementById('otherCompanyNameContainer');
    var otherCompanyNameInput = document.getElementById('otherCompanyName');

    if (selectedValue === 'Other') {
        otherCompanyNameContainer.style.display = 'block';
        otherCompanyNameInput.required = true;
    } else {
        otherCompanyNameContainer.style.display = 'none';
        otherCompanyNameInput.required = false;
    }
}






