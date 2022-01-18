var komut_yeri = document.getElementById("komut");
var ok = document.getElementById("ok");
var console = document.getElementById("console");
ciktilar = document.getElementById("ciktilar");

komut_yeri.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        runCommand();
    }
});
var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
info("krterminal v1.5.0");
info("For help write 'help'");
function runCommand() {
    ok.style.display = "none";

    let komut = komut_yeri.value;
    let komut_parcala = komut.split(" ");
    let node1 = document.createElement("div");
    node1.innerHTML = "=> " + komut;
    let komutdisi = komut_parcala.slice(1).toString().replace(/,/g, " ")
    ciktilar.appendChild(node1);
    komut_yeri.value = ""
    if (komut_parcala[0] == "color") {
        let renk = komut_parcala[1];
        document.body.style.color = renk;
        komut_yeri.style.color = renk;
        end()
    }
    else if (komut_parcala[0] == "echo") {
        write(komutdisi);
        end()
    }
    else if (komut_parcala[0] == "base64-decode") {
        write(btoa(komutdisi));
        end()
    }
    else if (komut_parcala[0] == "base64-encode") {
        write(atob(komutdisi));
        end()
    }
    else if (komut_parcala[0] == "curl") {
        let url = komut_parcala[1];



        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onload = function () {
            if (this.status == 200) {
                write(this.responseText);
            }
            else {
                write("Error: " + this.status);
            }
        }
        xhr.onerror = function () {
            write("The site did not allow");
        }
        end()
    }
    else if (komut_parcala[0] == "hack") {
        let hack = write(komutdisi + " is hacking");
        setTimeout(function () { hack.innerHTML = komutdisi + " is hacking." }, 1000);
        setTimeout(function () { hack.innerHTML = komutdisi + " is hacking.." }, 2000);
        setTimeout(function () { hack.innerHTML = komutdisi + " is hacking..." }, 3000);
        setTimeout(function () { hack.innerHTML = komutdisi + " is hacked!"; end() }, 4000)

    }
    else if (komut_parcala[0] == "open") {
        let url = "http://" + komutdisi
        setTimeout(function () { end() }, 1000)
        url = url.replace("http://http://", "http://");
        url = url.replace("http://https://", "https://");
        window.location.href = url

    }
    else {
        switch (komut) {
            case "help":
                info("###########################################")
                info("help - displays this message");
                info("ipconfig - Shows your IP address");
                info("color <color> - Changes the color of the terminal");
                info("echo <text> - Prints the text");
                info("base64-decode <text> - Decodes the text");
                info("base64-encode <text> - Encodes the text");
                info("curl <url> - Curls the url");
                info("hack <text> - Prints the text and adds 'is hacking'");
                info("clear - Clears the terminal");
                info("exit - Closes the terminal");
                write("###########################################");
                end();
                break
            case "clear":
                write("")
                ciktilar.innerHTML = "";
                end();
                break
            case "exit":
                window.location.href = "https://karanruzgar.me/"
                end();
                break
            case "ipconfig":
                let url = komut_parcala[1];



                let xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.karanruzgar.me/ip/", true);
                xhr.send();
                xhr.onload = function () {
                    end();
                    if (this.status == 200) {
                        write(this.responseText);
                    }
                    else {
                        write("Error: " + this.status);
                    }
                }
                xhr.onerror = function () {
                    write("An error occured");
                }
                
                break
            case "fullscreen":
                openFullscreen();
                write("Press 'esc' to exit fullscreen");
                end();
                break
            default:
                write("Command Not Found!")
                end();
        }
    }
}
function write(text) {
    let node = document.createElement("div");

    node.innerHTML = text + "<br>";


    komut_yeri.value = "";
    ciktilar.appendChild(node);
    return node
}
function end() {
    ok.style.display = "";
    komut_yeri.value = "";
}
function info(text) {
    let node = document.createElement("div");
    node.innerHTML = text + "<br>";
    ciktilar.appendChild(node)
}