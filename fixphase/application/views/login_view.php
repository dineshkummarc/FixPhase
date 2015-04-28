<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <link href=<?php echo base_url()."assets/css/bootstrap.min.css";?> type="text/css" rel="stylesheet" />
        <link href=<?php echo base_url()."assets/css/style.css";?> type="text/css" rel="stylesheet" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Login</title>
    </head>



    <body>

        <div class="container">
            <div class="row jumbotron">
                <div class="col-md-6 col-md-offset-3">
                    <div class="text-center">
                        <img src=<?php echo base_url()."assets/images/logo.jpg";?>  />


                        <div class="">
                            <?php echo validation_errors(); ?>
                            <h3>Login</h3>
                            <?php
                                $attr = array('class' => '', 'id' => '');
                                echo form_open('Login/validate', $attr);
                            ?>
                            <?php if(! is_null($msg)) echo $msg;?><br/><br/>


                            <div class="form-group">
                                <?php
                                    $attr = array(
                                        'type' => 'text',
                                        'class' => 'form-control',
                                        'id' => '',
                                        'placeholder' => 'Email',
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
                                        'id' => '',
                                        'placeholder' => 'Password',
                                        'name' => 'password'
                                    );
                                    echo form_password($attr);
                                ?>
                            </div>

                            <?php
                                $attr = array(
                                    'type' => 'submit',
                                    'class' => 'btn btn-warning',
                                    'value' => 'Login'
                                );
                                echo form_submit($attr);
                            ?>

                            <?php echo form_close();?>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox"> Keep me signed in </label>
                            </div>
                        </div>


                        </form>

                    </div>
                </div>
            </div>
        </div>


    </body>
</html>
