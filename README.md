# Prerequisites

XAMPP installed and configured.

# Running the site

Lets say you cloned your fork on your pc in the directory `DIR`, so in `DIR` you have a folder named `FixPhase`. 

Follow these steps to get it to work:

1. Open "C:\xampp\apache\config"
2. Open the file named `httpd.conf`
3. Search for this "C:/xampp/htdocs" and replace with "DIR/FixPhase/fixphase/public" (replace `DIR` with the one we assumed up that your `FixPhase` folder lies in)
4. Do step number 3 again, as there are 2 places where this string occurs in the file.
5. Save the file.
6. Restart xampp.
7. Goto `DIR/FixPhase/fixphase/application/config/".
8. Rename `database.php.sample` with `database.php`.
9. Open `database.php`, and fill your setting of your database like the user,password & database name.
10. Nothing here, you are done :)
