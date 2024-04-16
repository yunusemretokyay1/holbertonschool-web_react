interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  }
  
  const student1: Student = {
    firstName: 'Yunus Emre',
    lastName: 'Tokyay',
    age: 31,
    location: 'Thonon Les bains'
  };
  const student2: Student = {
    firstName: 'Agnes',
    lastName: 'Villa',
    age: 29,
    location: 'Lyon'
  };
  
  const studentsList: Array<Student> = [student1, student2];
  
  const tableHtml: HTMLTableElement = document.createElement('table');
  const theadHtml: HTMLTableSectionElement = document.createElement('thead');
  const tbodyHtml: HTMLTableSectionElement = document.createElement('tbody');
  
  const rowHeader: HTMLTableRowElement = theadHtml.insertRow();
  rowHeader.insertCell(0).innerHTML = 'firstName';
  rowHeader.insertCell(1).innerHTML = 'location';
  
  tableHtml.append(theadHtml);
  
  studentsList.forEach(student => {
    const row: HTMLTableRowElement = tbodyHtml.insertRow();
    row.insertCell(0).innerHTML = student.firstName;
    row.insertCell(1).innerHTML = student.location;
  });
  
  tableHtml.append(tbodyHtml);
  document.body.appendChild(tableHtml);