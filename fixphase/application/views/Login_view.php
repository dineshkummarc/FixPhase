<!--Author : Moataz M. Farid-->
<html>
<head>
    <title>Login Form</title>
</head>
<body>

<?php echo validation_errors(); ?>
<h3>Login</h3>
<?php echo form_open('Login/validate'); ?>
<?php if(! is_null($msg)) echo $msg;?><br/><br/>

<h5>Username</h5>
<input type="text" name="user_email" value="" size="50" />

<h5>Password</h5>
<input type="password" name="password" value="" size="50" />

<div><input type="submit" value="Submit" /></div>

</form>
</body>
</html>
