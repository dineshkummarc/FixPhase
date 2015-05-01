<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <link href=<?php echo base_url()."assets/css/bootstrap.min.css";?> type="text/css" rel="stylesheet" />
        <link href=<?php echo base_url()."assets/css/login.css";?> type="text/css" rel="stylesheet" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Login</title>
    </head>



    <body style="background-color: #5187a0">

        <div class="container">
            <div class="col-md-6 col-md-offset-3">
                <img src=<?php echo base_url()."assets/images/logo.png";?> id="logo"/>
            </div>
            <?php echo validation_errors(); ?>
            <?php
            $attr = array('class' => '', 'id' => '');
            echo form_open('Login/validate', $attr);
            ?>
            <?php if(! is_null($msg)) echo $msg;?><br/><br/>
                <div class="login">

                    <div class="form-group">
                        <?php
                        $attr = array(
                            'type' => 'email',
                            'class' => 'form-control',
                            'id' => 'email',
                            'placeholder' => 'Email Address',
                            'name' => 'user_email'
                        );
                        echo form_input($attr);
                        ?>
                    </div>
                    <div class="form-group">
                        <?php
                        $attr = array(
                            'type' => 'password',
                            'class' => 'form-control',
                            'id' => 'pass',
                            'placeholder' => 'Password',
                            'name' => 'password'
                        );
                        echo form_password($attr);
                        ?>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-md-offset-3" id="checkbox">
                            <input type="checkbox"> Remember Me</label>
                        </div>
                        <div class="col-md-4 col-md-offset-3" id="lgoinbtn">
                            <?php
                            $attr = array(
                                'type' => 'submit',
                                'class' => 'btn btn-default',
                                'value' => 'Login'
                            );
                            echo form_submit($attr);
                            ?>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-md-offset-3" id="signup">
                            <a href= <?php echo base_url().'Register' ?> >SIGN UP</a>
                        </div>
                        <div class="col-md-4" id="forgetpass">
                            <a href="#">Forget Password</a>
                        </div>
                    </div>
            <?php echo form_close();?>
        </div>



    </body>
</html>
