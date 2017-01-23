
"use strick"

var current_window = {};

function loadURL(param1, param2) {
    // body...
}

function checkURL() {

    //get the url by removing the hash
    var url = current_window.location.hash.replace(/^#/, '');
    alert(url);
    container = $('#content');
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        $('nav li.active').removeClass("active");
        // match the url and add the active class
        $('nav li:has(a[href="' + url + '"])').addClass("active");
        var title = ($('nav a[href="' + url + '"]').attr('title'))
        alert(title);
        // change page title from global var
        current_window.document.title = (title || current_window.document.title);
        //console.log("page title: " + document.title);

        // parse url to jquery
        loadURL(url + current_window.location.search, container);
    } else {

        // grab the first URL from nav
        var $this = $('nav > ul > li:first-child > a[href!="#"]');

        //update hash
        current_window.location.hash = $this.attr('href');

    }

}

function runTestHasHash(fakeWindow, resultTitle)
{
     
    current_window = fakeWindow;

    alert(current_window.document.title);

    checkURL();

    if (current_window.document.title == resultTitle) {
        alert("runTestHasHash accepted !!!!");    
        return true;
    }
    else
    {
        alert("runTestHasHash error\n expected result title:" + resultTitle + "\n result: " + current_window.document.title);    
        return false;
    }
}

function runTestNoHash(fakeWindow, expectedHash)
{
    current_window = fakeWindow;

    checkURL();
  

    if (current_window.location.hash == expectedHash)
    {       
        alert("runTestNoHash first part accepted !!!!");           
        if (runTestHasHash(current_window, "Cheburaska"))
        {
            alert("runTestNoHash full accepted !!!!");    
            return true;
        }
        else
        {
            alert("runTestHasHash part has error !!!!");    
            return true;
        }
    }  
    else
    {
        alert("runTestNoHash full error\n expected result hash:" + expectedHash + "\n result: " + current_window.location.hash);        
    }  
}


function runTests()
{   
    var fakeWindowMainRu = {
        location: {
            hash : "#http://www.mail.ru",
            search : ""
        },
        document: {
            title : "Test mail.ru"
        }
    } 

    runTestHasHash(fakeWindowMainRu, "Shapoklyak");

    var fakeWindowNoHash = {
        location: {
            hash : "",
            search : ""
        },
        document: {
            title : "Test"
        }
    } 

    runTestNoHash(fakeWindowNoHash, "http://www.ya.ru");
}

$( document ).ready(function() {
    runTests();
    console.log( "ready!" );
    current_window = window;
});


