var btn = document.getElementById('btn');
var input = document.getElementsByTagName("input"),
  emailIcon = document.querySelector(".email-icon");
var urlIcon = document.querySelector(".url-icon")
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var websites;
(function () {
  if (JSON.parse(localStorage.getItem("sites")) != null) {
    websites = JSON.parse(localStorage.getItem("sites"));
    display();
  }
  else {
    websites = []
  }
})()

btn.onclick = function () {
  if (siteName.value == "" && siteURL.value == "") {
     sweetAlert(
       "Site Name and Url is Empty", "", "error"
     );
  }
  addWebsite();
}

function addWebsite() {
  if (siteNameRegex() && isValidUrl()) {
    obj = {
      name: siteName.value,
      url: siteURL.value,
    }
    websites.push(obj);
    localStorage.setItem("sites", JSON.stringify(websites))
    display( websites);
    Swal.fire({
    toast: true,
    icon: 'success',
    title: 'Posted successfully',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
    clear();
  }
   
}
function display(){
  box = ''
  for (i = 0; i < websites.length; i++) {
    box += `<tr>
               <th>${i + 1}</th>
               <th>${websites[i].name}</th>
               <td><a class="btn btn-success target="_blank" href="${websites[i].url}" "><i class="fa-solid fa-eye pe-2"></i>visit</a></td>
               <td><button class="btn btn-danger" onclick="deleteSite(${i})" ><i class="fa-solid fa-trash-can pe-2"></i></i>Delete</button></td>
            </tr>`
      
     }
     document.getElementById('tableRow').innerHTML = box;
}
function clear() {
  siteName.value = "";
  siteURL.value = "";
  emailIcon.classList.replace("fa-check", "fa-book-bookmark");
  emailIcon.style.color = "#d1512d";
  siteName.style.borderColor = "transparent"
  urlIcon.classList.replace("fa-check", "fa-link");
  urlIcon.style.color = "#d1512d";
  siteURL.style.borderColor = "transparent"
}
function deleteSite(index) {
  websites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(websites));
  display();

}
function siteNameRegex() {
  var regex = /^[a-z][A-z]{3,50}$/
  return regex.test(siteName.value);
}
function isValidUrl() {
  var pattern =/^((http|https):\/\/)[A-Za-z]{2,50}\.?[a-zA-z0-9(\@?)]{1,255}\.[a-zA-z]{2,50}$/
  return pattern.test(siteURL.value);
}
for (i = 0; i < input.length; i++) {
  input[i].addEventListener("keydown", function notvalid() {
    var regex = /^[a-z][A-z]{3,50}$/
    if (siteName.value.match(regex)) {
      emailIcon.classList.replace("fa-check-circle", "fa-check");
      emailIcon.style.color = "green";
      siteName.style.borderColor = "green"
      siteName.style.boxShadow = "none"
    }
    var pattern = /^((http|https):\/\/)[A-Za-z]{2,50}\.?[a-zA-z0-9(\@?)]{1,255}\.[a-zA-z]{2,50}$/
    if (siteURL.value.match(pattern)) {
      urlIcon.classList.replace("fa-check-circle", "fa-check");
      urlIcon.style.color = "green";
      siteURL.style.borderColor = "green"
      siteURL.style.boxShadow = "blue"

    }
    if (!siteNameRegex()) {
      if (siteName.value == "") {
        emailIcon.classList.replace("fa-book-bookmark", "fa-check-circle");
        emailIcon.style.color = "red";
        siteName.style.borderColor = "red"
        siteName.style.boxShadow = "none"
      }
      else {
        emailIcon.classList.replace("fa-check", "fa-check-circle");
        emailIcon.style.color = "red";
        siteName.style.borderColor = "red"
        siteName.style.boxShadow = "none"
      }

    }
    else if (!isValidUrl()) {
      if (siteURL.value == "") {
        urlIcon.classList.replace("fa-link", "fa-check-circle");
        urlIcon.style.color = "red";
        siteURL.style.borderColor = "red"
        siteURL.style.boxShadow = "none"
      }
      else {
        urlIcon.classList.replace("fa-check", "fa-check-circle");
        urlIcon.style.color = "red";
        siteURL.style.borderColor = "red"
        siteURL.style.boxShadow = "none"
      }
    }
  })
}


