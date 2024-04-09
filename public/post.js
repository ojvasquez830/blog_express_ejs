
function SwitchToEdit()
{
    var element = document.getElementById("editForm");
    element.classList.remove("hidden");

    element = document.getElementsByClassName("existingPost")[0];
    element.classList.add("hidden");

    document.getElementById("hrefEdit").classList.add("active");
}

function SwitchToView()
{
    var element = document.getElementsByClassName("existingPost")[0];
    element.classList.remove("hidden");

    element = document.getElementById("editForm");
    element.classList.add("hidden");

    document.getElementById("titleI").value = document.getElementById("titleText").innerText;
    document.getElementById("textI").value = document.getElementById("postText").innerText;

    document.getElementById("hrefEdit").classList.remove("active");

}