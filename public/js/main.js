// var element = document.getElementById("icon");

function Toggle() {   //for dark theme
    var element = document.body;
    element.classList.toggle("light-theme");
}

const btn = document.getElementById('btn');   //for color of button of dark theme glow effect

let index = 0;

const colors = ['white', 'gray'];

btn.addEventListener('click', function onClick() {
  btn.style.color = colors[index];

  index = index >= colors.length - 1 ? 0 : index + 1;
});

// for dropdown
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownfunc() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


//for banner image
// const image_input = document.querySelector("#image-input");
// image_input.addEventListener("change", function() {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => {
//     const uploaded_image = reader.result;
//     document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
//   });
//   reader.readAsDataURL(this.files[0]);
// });




//load more
    $(document).ready (function () {  
      $(".content").slice(0, 6).show();  
      $("#loadMore").on("click", function(e){  
        e.preventDefault();  
        // $(".content").removeClass("mt-5");  
        $(".content:hidden").slice(0, 6).slideDown();  
        if ($(".content:hidden").length == 0) {  
          $("#loadMore").text("No More Content").addClass("noContent");  
        }  
      });  
      })  

