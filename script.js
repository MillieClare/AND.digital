
const newCandidates = [
    { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
    { name: "Mario", skills: ["Python", "AWS"] },
    { name: "Jacquline", skills: ["JavaScript", "Azure"] },
    { name: "Kathy", skills: ["JavaScript", "Java"] },
    { name: "Anna", skills: ["JavaScript", "AWS"] },
    { name: "Matt", skills: ["PHP", "AWS"] },
    { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
];

function removeRowsFromTable(table) {
    const rows = table.getElementsByTagName("tr");

    while (rows.length > 1) {
        table.deleteRow(1);
    }
}

function insertCandidate(tbody, name, skills) {
    const newRow = tbody.insertRow();
    const nameCell = newRow.insertCell();
    const skillCell = newRow.insertCell();

    const candidateName = document.createTextNode(name);
    const candidateSkills = document.createTextNode(skills.join(', '));

    nameCell.appendChild(candidateName);
    skillCell.appendChild(candidateSkills);
}

function addCandidatesToTable(table, candidates) {
    candidates.forEach(candidate => insertCandidate(table, candidate.name, candidate.skills));
}
//function to filter by skill
function filterCandidateBySkill(candidates, skill) {
    return candidates.filter(a => a.skills.includes(skill));
}

//function to create array consisting of one of each skill
function createDropdownArray(candidates) {
    const candidateArray = candidates.reduce((b, c) => [...b, ...c.skills], []);
    return candidateArray.filter((a, i) => candidateArray.indexOf(a) === i);
}

//function to create dropdown, sorts skills alphabetically
function createDropdown(skillsArray) {
    let html = '<select id="dropdown"><option value="" selected="selected">Choose skill</option>';
    for (let skill of skillsArray.sort()) {
        html += `<option value='${skill}'>${skill}</option>`
    }
    html += '</select>';
    document.getElementById('dropdownWrapper').innerHTML = html;
}


window.addEventListener('load', () => {
    //create copy of example table
    const candidatesTable = document.getElementById("candidates_example");
    const newCandidatesTable = candidatesTable.cloneNode(true);
    //creates the dropdown with the list of skills
    const dropdownArrayOptions = createDropdownArray(newCandidates);
    createDropdown(dropdownArrayOptions);

    //everytime a new selection is made, this function is executed.
    document.getElementById('dropdown').addEventListener('change', event => {
        //reset dropdown each time a different option is chosen. 
        removeRowsFromTable(newCandidatesTable);
        const newTbody = newCandidatesTable.getElementsByTagName('tbody')[0];
        document.body.appendChild(newCandidatesTable);
        //adapted function parameters to return the array of candidates with the skill selected by the drop down.
        const filteredCandidates = filterCandidateBySkill(newCandidates, event.target.value);

        addCandidatesToTable(newTbody, filteredCandidates)
    })
})
