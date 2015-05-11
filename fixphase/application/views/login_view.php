<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <link href=<?php echo base_url()."assets/css/bootstrap.min.css";?> type="text/css" rel="stylesheet" />
        <link href=<?php echo base_url()."assets/css/login.css";?> type="text/css" rel="stylesheet" />

        <script src= <?php echo base_url()."assets/lib/jquery/jquery.js" ;?> ></script>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Login</title>
    </head>



    <body style="background-color: #5187a0">

        <div class="container-fluid">
			<div class="row">
				<div style="width:21%; margin-left:40%" class="col-sm-3 col-sm-offset-5 col-xs-4 col-xs-offset-4">
                    <img src=<?php echo base_url()."assets/images/logo.png";?> id="logo"/>
                </div>
			</div>

			<div class="login col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-4 col-xs-6 col-xs-offset-3">
                    <?php echo validation_errors(); ?>
                    <?php
                    $attr = array('class' => '', 'id' => '');
                    echo form_open('Login/validate', $attr);
                    ?>
                    <?php if(! is_null($msg)) echo $msg;?><br/><br/>
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
                        <div class="row" id="option-row">
                            <div class="" id="remmber-me">
                                <input type="checkbox"> Remember Me</label>
                            </div>
                            <div class="" id="login-btn">
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
                        <div class="row" id="option-row">
                            <div class="" id="signup">
                                <a href= <?php echo base_url().'Register' ?> >SIGN UP</a>
                            </div>
                            <div class="" id="forget-pass">
                            <a href="#">Forget Password</a>
                            </div>
                        </div>
                    <?php echo form_close();?>
            </div>
		</div>



    </body>
</html>
