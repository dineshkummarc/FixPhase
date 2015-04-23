##Prerequisites

None. But if you want to understand what is going on and how to use it correctly, which is a thing you will do sooner or later and sooner would be better, I recommend reading the first 3 chapters of this online book [Git-Book](http://git-scm.com/book/en/v2)  which won’t take more than 2 to 3 hours reading.


##Requirements

Git installed.
Account on github.
PHPStorm (optional if you know what you are doing).


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


## Workflow (Shortcut exist at the end of the page)

When there is a feature/bug you need to make/fix you should do that as follow (this are the steps you will always follow when there is something you want to work on):

1. Open git shell and go to the local repo directory.
2. Make sure you are in the master branch by typing 

    ``` 
   git checkout master 
   ``` 
3. Synchronize local master with main repo master by typing 

    ```
git pull
git remote prune origin
git push
```
4. You will be asked for user name and passwor, enter the email and password of your github account.
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

10. Now head on to your github account and go to your home page and select repositories and select your forked repo

    ![selection_019](https://cloud.githubusercontent.com/assets/5361308/7255429/e5094592-e851-11e4-93f6-2dc65ab51748.png)
    ![selection_020](https://cloud.githubusercontent.com/assets/5361308/7255452/095ec12e-e852-11e4-92b6-8ead7cbd7769.png)

11. In the repo page you will find something like that, hit the circled green button
    ![selection_021](https://cloud.githubusercontent.com/assets/5361308/7255704/9ec4280c-e853-11e4-9ac0-9c79dec871ea.png)

12. Now you will be transfered to the pull request page where you need to click the green button to send it to the maintainers of the main repo to accept it.
    ![selection_022](https://cloud.githubusercontent.com/assets/5361308/7255725/c64df81c-e853-11e4-96d7-a01684b0265d.png)
13. Now you should wait till the pull request is accepted to complete the next steps. If you want to work on a new feature in that time please follow the same steps again from number 1 to 12.
13. When the pull request is accepted you should go to your master branch and update it, it also delete the feature branch from the remote and locally, type the following
  
    ```
    git push --delete origin featurename
    git checkout master
    git pull
    git remote prune origin
    git push
    ```

This is what you should always follow and make sure you never make changes in the master branch except pulling from the main repo or branching from it.


## Mergin pull requests (for main repo maintainers)

We should never use the automatic merge pull request of github because it mess up the history. So to merge we need to follow these steps:

1. Open the pull request and click on command line and paste the two line in the terminal, this creates a new branch with the pull request in it on your local repo

    ![selection_023](https://cloud.githubusercontent.com/assets/5361308/7257208/89d45a12-e85c-11e4-98ad-1867291dec5b.png)
2. Now you need to rebase the pull request branch with master and fix any found conflicts (the rebase will make our history clean and nice)

    ```
    git rebase master
    ```
3. Now go to master and merge the pull request and delete the pull request branch then push these stuff to the main repo master, this will also close the pull request.

    ```
    git checkout master
    git merge --no-ff username/pullbranch
    git branch -d username/pullbranch
    git push
    ```

## Shortcuts

Here we will make new git commands that will be a shortcut for common things.

1. open .gitconfig file for linux it is in `~/.gitconfig`, for windows it is in `C:\Users\YouUserName\.gitconfig`
2. paste this at the end of it

    ```
    [alias]
    mergepull = !sh -c 'git checkout master && git merge --no-ff $0 && git branch -d $0 && git push'
    ls = !git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
    startf = !sh -c 'git checkout master && git pull && git remote prune origin && git push && git config --global credential.helper cache && git checkout -b $0'
    pushf  = !sh -c 'git checkout $0 && git push -u origin $0' 
    finishf = !sh -c 'git checkout $0 && git push --delete origin $0 && git checkout master && git pull && git remote prune origin && git push'
    ```

Thats it. Now you have the following commands:

1. `git startf featurename` this is used to start a new feature it makes all the steps needed from 1->6 in the workflow
2. `git pushf featurename` this push your feature to your fork so you can make pull request from github
3. `git finishf featurename` this is used when your feature is accepted it does the last step 13 in workflow 
3. `git ls` shows your history of commits in a nice way
4. `git mergepull featurebranch` this is used by maintainers of main repo after rebasing the feature branch, it checkout to master and merge the branch, then delete the branch and push to remote and close merge request

So with this shortcut in place we can summarize the needed steps to create new feature in the following:

1. `git startf featurename`
2. finish your code and commit regularly to your local branch
3. `git pushf featurename`
4. go to github and issue pull request
5. wait your feature to get reviewed by maintainers and wait for it to get accepted. In the meanwhile you can start to work on new feature by following step 1-5.
6. `git finishf featurename`










