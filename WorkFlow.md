##Table of Contents

1. [Prerequisites](#prerequisites)
2. [Requirements](#requirements)
3. [Forking the repo](#forking-the-repo)
4. [Workflow](#workflow-shortcuts-exist-)
5. [Shortcuts](#shortcuts)
6. [Workflow with Shortcuts](#workflow-with-shortcuts)
7. [Merging pull requests (for maintainers only)](#merging-pull-requests-for-maintainers-only)
8. [How to update for people who already have a fork](#how-to-update-for-people-who-already-have-a-fork)


##Prerequisites

None. But if you want to understand what is going on and how to use it correctly, which is a thing you will do sooner or later and sooner would be better, I recommend reading the first 3 chapters of this online book [Git-Book](http://git-scm.com/book/en/v2)  which won’t take more than 2 to 3 hours reading.

[return to TOC](#table-of-contents)

##Requirements

Git installed.
Account on github.

[return to TOC](#table-of-contents)


##Forking the repo

First thing you need to do is fork the main repo on github, which means create a copy of the repo on your account on github. We need to fork because no one have write access to the main repo, so all your work will be on your forked repo where you have write access and you will issue pull requests when you need to update your work to the main repo.

####Follow these steps:
1. Open github and login.
2. Go to this url https://github.com/AbdulazizAlaa/FixPhase
3. Click on fork up on the right

   ![selection_017](https://cloud.githubusercontent.com/assets/5361308/7254177/1a880f44-e84a-11e4-8a92-8387859179bd.png) 

4. Open git shell/bash/terminal.
5. Go to the directory where the local copy of your forked repo will exist in, this is where all your work will be in.
6. Type in terminal `git clone url` replace url with the one from the forked repo as shown below, this will create a local copy in the current directory
   ![selection_018](https://cloud.githubusercontent.com/assets/5361308/7254489/1c80c4a6-e84c-11e4-8e06-229313a51a8d.png) 
7. Now we need to make this local/master branch pull from main/master and push to forked/master, type the follwoing replacing url in the second command with the url you used in `git clone`.  

    ```
git remote set-url origin https://github.com/AbdulazizAlaa/FixPhase.git
git remote set-url --push origin url
```
8. Now we need to make database.php changes not tracked by git so use this, make sure you are in the root directory that contains the fixphase folder

    ````
    git checkout master
    git update-index --assume-unchanged fixphase/application/config/database.php
    ````


Now you have created your local repo that is attached to both the main repo and the forked one. 

**Note that in the local repo you should never manually make any changes to the master branch, it is only used to checkout feature branches from it**

[return to TOC](#table-of-contents)

## Workflow ([shortcuts](#shortcuts) exist )

**It is preferable to use the [workflow with shortcuts](#workflow-with-shortcuts) when working, but please try this section at least one time before heading to the shortcuts section because some stuff are explained here in more details.**

When there is a feature/bug you need to make/fix you should do that as follow (this are the steps you will always follow when there is something you want to work on):

1. Open git shell and go to the local repo directory.
2. Make sure you are in the master branch by typing 

    ``` 
   git checkout master 
   ``` 
3. Synchronize local master with main repo master by typing 

    ```
git pull
git push
```
4. You will be asked for user name and password, enter the email and password of your github account.
5. Type the following to cache your user/pass for sometime
    
    ```
    git config --global credential.helper cache
    ```

6. Create a new branch where you will make your feature/big-fix in, type as follow replacing `featurename` with a discriptive name (like for example `login_page, list_fix, etc..`) 

    ```
git checkout -b featurename
```
7. Now in this branch you can work on your feature and change the code as you like and committing locally to that branch using normal `git commit -m` 
8. Keep doing so until the desired feature is done.
9. Now you need to push this branch to the forked repo on github by typing and replacing featurename with the name you chose before

    ```
git push -u origin featurename
```

10. Next we need to inform main repo maintainers that you have finished your feature and would like them to merge your code to the main repo, so head on to your github account and go to your home page and select repositories and select your forked repo

    ![selection_019](https://cloud.githubusercontent.com/assets/5361308/7255429/e5094592-e851-11e4-93f6-2dc65ab51748.png)
    ![selection_020](https://cloud.githubusercontent.com/assets/5361308/7255452/095ec12e-e852-11e4-92b6-8ead7cbd7769.png)

11. In the repo page you will find something like that, hit the circled green button
    ![selection_021](https://cloud.githubusercontent.com/assets/5361308/7255704/9ec4280c-e853-11e4-9ac0-9c79dec871ea.png)

12. You will be transfered to the pull request page where you need to click the green button to send it to the maintainers of the main repo to accept it.
    ![selection_022](https://cloud.githubusercontent.com/assets/5361308/7255725/c64df81c-e853-11e4-96d7-a01684b0265d.png)
13. Now you should wait till the pull request is accepted to complete the next steps. If you want to work on a new feature in that time please follow the same steps again from number 1 to 13.
14. When the pull request is accepted you should go to your master branch and update it, delete the feature beanch as it is no longer needed, type the following
  
    ```
    git push --delete origin featurename
    git checkout master
    git branch -D featurename
    git pull
    git push
    ```

This is what you should always follow and make sure you never make changes in the master branch except pulling from the main repo or branching from it.

[return to TOC](#table-of-contents)

## Shortcuts

Here we will make new git commands that will be shortcuts for our workflow steps.

1. open .gitconfig file for linux it is in `~/.gitconfig`, for windows it is in `C:\Users\YouUserName\.gitconfig`
2. paste this at the end of it, save file and exit.

    ```
    [alias]
    ls = !git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
startf = !sh -c 'git checkout master && git pull && git checkout -b $0'
pushf  = !sh -c 'git checkout $0 && git push -u origin $0 && git config --global credential.helper cache' 
finishf = !sh -c 'git checkout $0  && git checkout master && git pull && git push && git config --global credential.helper cache && git push --delete origin $0 && git branch -D $0 '
    ```

Thats it. Now you have the following commands (you can use them in the workflow as described [here](#workflow-with-shortcuts)):

1. `git startf featurename` this is used to start a new feature it makes steps [1->6] in the workflow
2. `git pushf featurename` this push your feature to your fork so you can make pull request from github step [9]
3. `git finishf featurename` this is used when your feature is accepted it does the last step [14] in workflow 
3. `git ls` shows your history of commits in a nice way

[return to TOC](#table-of-contents)

##Workflow with Shortcuts

Here we will use the shortcuts we added [here](#shortcuts) to simplify our workflow.

So when evenr you want to work on something do the following (replace `featurename` with a descriptive name):

1. Go to repo location in git bash and type `git startf featurename`
2. Finish your code and commit regularly to your local branch
3. Type `git pushf featurename` to push feature.
4. Go to github and issue pull request as in steps [10-11-12] in [workflow](#workflow-shortcuts-exist-)
5. Wait your feature to get reviewed by maintainers and wait for it to get accepted. In the meanwhile you can start to work on new feature by following step 1-5.
6. When done, type `git finishf featurename` to update your master and remove the branch.


[return to TOC](#table-of-contents)


## Merging pull requests (for maintainers only)

We should not merge pull request from github directly as this will mess up our history also we woudnlt be abel to test the code in pull request locally before merging it.

First lets add more shortcuts that will help us in merging so add the follwing lines to your .gitconfig file under alias: (if you want to know how to add shortcuts refer to [this](#shortcuts))

```
getpull = "!sh -c 'git remote add $0 $1; git fetch $0 && git checkout -b $0-$2 $0/$2'"
mergepull = "!sh -c 'git checkout master && (git merge-base --is-ancestor master $0-$1 || (echo "rebase first" && false))  && git merge --no-ff -m \"Merge pull request #$2 from $0/$1\" $0-$1 && git push && git config --global credential.helper cache && git branch -D $0-$1'"
```

Before starting open your browser to the pull request page the picture below shows all the things we will use.
![image](https://cloud.githubusercontent.com/assets/5361308/7332598/674a582a-eb4f-11e4-90d8-df9d881d7d32.png)
![image](https://cloud.githubusercontent.com/assets/5361308/7332600/6b51b080-eb4f-11e4-92d9-721335b5ce5e.png)


There are 3 things that should be done when merging a pull request:

1. Get the pull request branch locally to test using `git getpull <user> <url> <pull_branch>` (get argumnets from picture), now you can test the branch locally and if there is something wrong head back to the pull request page and dicuss it with the developer.

   
    
2. When you are done with testing and developer have made required changes if any, it is time to do the merge so lets first rebase the branch with master

    ```
   git rebase master
   ```
   then lets merge and push

    ```
    git mergepull <user> <pull_branch> <pull_id>
    ```
    
    **NOTE**: it is possible when pushing to the remote that some one had made changes and it wont let you push till you sync with remote to do so type the following:
    
    ```  
git checkout master
git pull
git rebase --preserve-merges origin/master
```
3. Manually close the pull request with a merged comment as shown below. (Optionally you can add the merge commit hash to your comment)

    ![image](https://cloud.githubusercontent.com/assets/5361308/7332814/e1947ff4-eb5c-11e4-9621-6a27bcc39837.png)





Solve any conflicts appearing then push again with `git push`




[return to TOC](#table-of-contents)


## How to update for people who already have a fork

This part is only for the ones who had made their fork before we updated the workflow.

You should follow the following steps:

1. Go to git bash and type 

    ```
    git checkout master
    git pull
    ```
2. Type the following ( mind that the following 2 commands may return an error just ignore the errors and keep going)

    ```
    git push --delete origin Development
    git branch -D Development
    ```
3. `cd` to the root directory that contains the fixphase folder and type the following

    ```
    git checkout master
    git update-index --assume-unchanged fixphase/application/config/database.php
    ```
4. We need to edit the shortcuts you have made before so follow [this](#shortcuts) replacing every thing you have put there before with the new code. If you have not made the shortcuts part then it is a good time to follow the instructions and make them because they simplify the commands for the workflow as described [here](#workflow-with-shortcuts).
5. If you currently are not working on any feature and dont have any branch except the master branch you are done, otherwise continue to the next steps.
6. Now if you have any branch(feature) that you are already working on you need to do the following 

    ```
    git checkout featurename
    git rebase master
    ```
7. If you get conflicts in the previous commands, then seek for help by asking in the facebook group.
[return to TOC](#table-of-contents)
