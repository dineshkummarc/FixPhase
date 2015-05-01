<!DOCTYPE html>
<html>
  <head>
    <link href=<?php echo base_url()."assets/css/bootstrap.min.css";?> type="text/css" rel="stylesheet" />
    <link href=<?php echo base_url()."assets/css/register.css";?> type="text/css" rel="stylesheet" />
    <title>Register</title>
  </head>
  <body>

  <div class="logo">
      <img src= <?php echo base_url()."assets/images/logo.png";?> />

  </div>


  <div class="register">
      <?php
          echo form_open('Register/validate');
          echo validation_errors();
      ?>
          <div class="form-group">
              <?php
                  $attr = array(
                      'type' => 'text',
                      'class' => 'form-control',
                      'id' => 'fill_form',
                      'placeholder' => 'First Name',
                      'name' => 'Fname'
                  );
              echo form_input($attr);
              echo "<p> Must be at least 4 characters long</p>";
              ?>
          </div>

          <div class="form-group">
              <?php
              $attr = array(
                  'type' => 'text',
                  'class' => 'form-control',
                  'id' => 'fill_form',
                  'placeholder' => 'Last Name',
                  'name' => 'Lname'
              );
              echo form_input($attr);
              echo "<p> Must be at least 4 characters long</p>";
              ?>
          </div>

          <div class="form-group">
              <?php
              $attr = array(
                  'type' => 'text',
                  'class' => 'form-control',
                  'id' => 'fill_form',
                  'placeholder' => 'User Name',
                  'name' => 'username'
              );
              echo form_input($attr);
              echo "<p> Must be at least 4 characters long</p>";
              ?>
          </div>

          <div class="form-group">
              <?php
              $attr = array(
                  'type' => 'email',
                  'class' => 'form-control',
                  'id' => 'fill_form',
                  'placeholder' => 'E-Mail',
                  'name' => 'email'
              );
              echo form_input($attr);
              echo "<p> Must be a valid E-Mail</p>";
              ?>
          </div>

          <div class="form-group">
              <?php
              $attr = array(
                  'type' => 'password',
                  'class' => 'form-control',
                  'id' => 'fill_form',
                  'placeholder' => 'Password',
                  'name' => 'password'
              );
              echo form_password($attr);
              echo "<p> Must be at least 8 characters long</p>";
              ?>
          </div>

          <div class="form-group">
              <?php
              $attr = array(
                  'type' => 'password',
                  'class' => 'form-control',
                  'id' => 'fill_form',
                  'placeholder' => 'Confirm Password',
                  'name' => 'cpassword'
              );
              echo form_password($attr);
              echo "<p> Must match the password </p>";
              ?>
          </div>

          <div class="form-group">
              <?php
              $options = array(
                  'Developer'         => 'Developer',
                  'Tester'           => 'Tester',
              );
              $attr = array(
                  'class' => 'form-control',
                  'id' => 'role',
                  'placeholder' => 'Role',
                  'name' => 'role'
              );
              echo form_dropdown($attr,$options );
              ?>
          </div>

          <div class="checkbox">
              <label>
                  <input type="checkbox" > I agree on  <a href="#"> Terms and Conditions</a>
              </label>
          </div>

          <?php
          $attr = array(
              'type' => 'submit',
              'class' => 'btn btn-warning',
              'value' => 'Register'
          );
          echo form_submit($attr);
          ?>
      <?php echo form_close();?>

  </body>
</html>
