var people = [];
var incomes = 0;
var slideIndex = 1;
showSlides(slideIndex);
var modal = document.getElementById('popup');
var modalEdit = document.getElementById('popupEdit');
var customer_id = '';

$(document).ready(function () {
    $.getJSON('customers.json', function (data) {
        people = data;
    });
});

function opentab(evt, tab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
    if (tab == 'allcustomers') {
        getDataTableAllCustomers();
    } else if (tab == 'negativecustomers') {
        getDataTableNegativeCustomers();
    } else if (tab == 'search') {
        searchTab();
    }
}
function searchTab() {

}
function search() {
    var name_like = document.getElementById("site-search").value.toLowerCase();
    var result = '';

    let obj = people.filter(item => {
        var name = item.name.toLowerCase();
        if (name.indexOf(name_like.toString()) >= 0 && item.isActive === document.getElementById("isactive_search").checked) {
            var image = item.isActive ? 'isactive.png' : '';
            result += '<tr>';
            result += '<td style="display:none">' + item._id + ' </td>';
            result += '<td> <img src="' + image + '" style="height:15px"></img></td>';
            result += '<td>' + item.name + '</td>';
            result += '<td>' + item.email + '</td>';
            result += '<td>' + item.phone + '</td>';
            result += '<td>' + item.balance + '</td>';
            result += '<td style="text-align: center;"><button onclick="show(	&quot;search&quot;)" >Details</button></td>';
            result += '<td style="text-align: center;"><button onclick="edit(	&quot;search&quot;)" >Edit</button></td>';
            result += '</tr>';
        }
    });
    $("#result tr>td").remove();
    $('#result').append(result);

}
function edit(text) {
    var table = '';
    if (text === 'search') {
        table = document.getElementById('result');
    } else if (text === 'customer') {
        table = document.getElementById('customer');
    } else if (text === 'customer_negative') {
        table = document.getElementById('customer_negative');
    }

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            index = this.rowIndex;
            customer_id = this.cells[0].innerHTML.trim();
            let obj = people.filter(o => o._id === this.cells[0].innerHTML.trim());
            if (obj.length > 0) {
                document.getElementById("isactive").checked = obj[0].isActive;
                document.getElementById("table_name_edit").value = obj[0].name;
                document.getElementById('table_company_edit').value = obj[0].company;
                document.getElementById('table_age_edit').value = obj[0].age;
                document.getElementById('table_email_edit').value = obj[0].email;
                document.getElementById('table_address_edit').value = obj[0].address;
                if (obj[0].gender == 'female') {
                    document.getElementById("female").checked = true;
                } else {
                    document.getElementById("male").checked = true;
                }
                document.getElementById('table_phone_edit').value = obj[0].phone;
                document.getElementById('table_balance_edit').value = obj[0].balance;
                if (parseFloat(obj[0].balance) < 0) {
                    document.getElementById("table_balance_edit").className += "negative";
                } else {
                    document.getElementById("table_balance_edit").classList.remove('negative');
                }
            }
        }
    }

    modalEdit.style.display = "block";
}
function getDataTableNegativeCustomers() {
    var customer_negative = '';
    let obj = people.filter(o => parseFloat(o.balance) < 0);
    var sum = 0;
    if (obj.length > 0) {
        obj.forEach(value=> {
            var image = value.isActive ? 'isactive.png' : '';
            customer_negative += '<tr>';
            customer_negative += '<td style="display:none">' + value._id + ' </td>';
            customer_negative += '<td> <img src="' + image + '" style="height:15px"></img></td>';
            customer_negative += '<td>' + value.name + '</td>';
            customer_negative += '<td>' + value.email + '</td>';
            customer_negative += '<td>' + value.phone + '</td>';
            customer_negative += '<td>' + value.balance + '</td>';
            customer_negative += '<td style="text-align: center;"><button onclick="show(&quot;customer_negative&quot;)">Details</button></td>';
            customer_negative += '</tr>';

        });
    }
    $("#customer_negative tr>td").remove();
    $('#customer_negative').append(customer_negative);


    people.forEach(value=> {
        sum += parseFloat(value.balance);
    });
    document.getElementById("incomes").innerHTML = sum + " Euro";
}

function getDataTableAllCustomers() {
    var customer_data = '';
    this.people.forEach(value=> {
        var image = value.isActive ? 'isactive.png' : '';
        customer_data += '<tr>';
        customer_data += '<td style="display:none">' + value._id + ' </td>';
        customer_data += '<td> <img src="' + image + '" style="height:15px";></img></td>';
        customer_data += '<td>' + value.name + '</td>';
        customer_data += '<td>' + value.company + '</td>';
        customer_data += '<td>' + value.gender + '</td>';
        customer_data += '<td>' + value.email + '</td>';
        customer_data += '<td>' + value.address + '</td>';
        customer_data += '<td>' + value.balance + '</td>';
        customer_data += '<td style="text-align: center;"><button onclick="show(&quot;customer&quot;)">Details</button></td>';
        customer_data += '</tr>';
    });
    $("#customer tr>td").remove();
    $('#customer').append(customer_data);
}
function show(text) {
    var table = '';
    if (text === 'search') {
        table = document.getElementById('result');
    } else if (text === 'customer') {
        table = document.getElementById('customer');
    } else if (text === 'customer_negative') {
        table = document.getElementById('customer_negative');
    }
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            index = this.rowIndex;
            let obj = people.filter(o => o._id === this.cells[0].innerHTML.trim());
            if (obj.length > 0) {
                var disc = '';
                document.getElementById("isactive").checked = obj[0].isActive;
                document.getElementById("table_name").innerHTML = obj[0].name;
                document.getElementById('table_company').innerHTML = obj[0].company;
                document.getElementById('table_age').innerHTML = obj[0].age;
                document.getElementById('table_email').innerHTML = obj[0].email;
                document.getElementById('table_address').innerHTML = obj[0].address;
                document.getElementById('table_gender').innerHTML = obj[0].gender;
                document.getElementById('table_phone').innerHTML = obj[0].phone;
                document.getElementById('table_balance').innerHTML = obj[0].balance;
                if (parseFloat(obj[0].balance) < 0) {
                    document.getElementById("table_balance").className += "negative";
                } else {
                    document.getElementById("table_balance").classList.remove('negative');
                    disc = parseFloat(obj[0].balance) - parseFloat(obj[0].balance) * 0.1;
                }
                document.getElementById('table_balance_disc').innerHTML = disc.toString().replace('.', ',');

            }
        }
    }
    modal.style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


function save() {

    this.people.forEach(item=> {
        if (item._id.trim() === this.customer_id.trim()) {
            item.name = document.getElementById("table_name_edit").value;
            item.age = document.getElementById('table_age_edit').value;
            item.email = document.getElementById('table_email_edit').value;
            item.company = document.getElementById('table_company_edit').value;
            item.phone = document.getElementById('table_phone_edit').value;
            item.balance = document.getElementById('table_balance_edit').value;
            item.gender = document.getElementById("female").checked ? 'famale' : 'male';
            item.isActive = document.getElementById("isactive").checked ? 'true' : '';
        }
    })
    this.search();
    this.closepopup();

}
function closepopup() {
    modal.style.display = "none";
    modalEdit.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modalEdit) {
        modalEdit.style.display = "none";
    }
}
function addFunction() {
    var table = document.getElementById("customer");
    var row = table.insertRow(people.length + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = document.getElementById("name").value;
    cell2.innerHTML = document.getElementById("phone").value;
}
