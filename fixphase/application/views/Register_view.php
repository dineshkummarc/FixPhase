<!DOCTYPE html>
<html>
  <head>
    <title>Register</title>
  </head>
  <body>
    <!--
    this the form but made in php
    you will need to use codeigniter functions like
    form_input('username', )
    -->
    <?php
    //<===========WORK==========>
    //need to put the constraints of every form element besides it
    //like password need to be atleast 8 characters long
    //all the form elements
    //<===========WORK==========>

    echo site_url();
    echo form_open('Register/validate');

    echo validation_errors();

    echo "<p>User Name:";
    echo form_input('username');
    echo "</p>";

    echo "<p>First Name:";
    echo form_input('Fname');
    echo "</p>";

    echo "<p>Last Name:";
    echo form_input('Lname');
    echo "</p>";

    echo "<p>Password:";
    echo form_password('password');
    echo "</p>";

    echo "<p>Confirm Password:";
    echo form_password('cpassword');
    echo "</p>";

    echo "<p>Email:";
    echo form_input('email');
    echo "</p>";

    echo "<p>Role:";
    $options = array(
            'Developer'         => 'Developer',
            'Tester'           => 'Tester',
    );

    echo form_dropdown('role',$options );
    echo "</p>";

    echo form_submit('Submit', 'Submit');
    echo form_close();
    ?>

  </body>
</html>
