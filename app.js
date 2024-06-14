var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    purchases = document.getElementById("purchases"),
    phone = document.getElementById("phone"),
    amount = document.getElementById("amount"),
    pDate = document.getElementById("pDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/img.jpg"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.customerDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="customerDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.customerName}</td>
            <td>${element.customerAge}</td>
            <td>${element.customerCity}</td>
            <td>${element.customerPurchases}</td>
            <td>${element.customerPhone}</td>
            <td>${element.customerAmount}</td>
            <td>${element.purchaseDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.customerName}', '${element.customerAge}', '${element.customerCity}', '${element.customerPurchases}', '${element.customerPhone}', '${element.customerAmount}', '${element.purchaseDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.customerName}', '${element.customerAge}', '${element.customerCity}', '${element.customerPurchases}', '${element.customerPhone}', '${element.customerAmount}', '${element.purchaseDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, name, age, city, purchases, phone, amount, pDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showPurchases").value = purchases,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showAmount").value = amount,
    document.querySelector("#showpDate").value = pDate
}


function editInfo(index, pic, name, Age, City, Purchases, Phone, Amount, Pdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value =City
    purchases.value = Purchases,
    phone.value = Phone,
    amount.value = Amount,
    pDate.value = Pdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/img.jpg" : imgInput.src,
        customerName: userName.value,
        customerAge: age.value,
        customerCity: city.value,
        customerPurchases: purchases.value,
        customerPhone: phone.value,
        customerAmount: amount.value,
        purchaseDate: pDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/img.jpg"  

})