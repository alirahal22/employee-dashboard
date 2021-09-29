echo -e "Pulling Updates from master \n";
branch=$(git pull origin master);
echo $branch;
echo -e "\n Done pulling updates from master \n";
echo -e  "\n Trying to do yarn install \n";
yarnInstall=$(yarn install);
echo $yarnInstall;
echo -e "\n Done doing yarn install \n";
deleteBuild=$(rm -R ./build -f)
echo -e "\n Trying to do yarn build \n";
yarnBuild=$(yarn build);
echo $yarnBuild;
echo -e "\n Yarn build done \n";
echo -e "Updating nginx \n";
deleteOldwww=$(rm -R /etc/nginx/www/dev.alirahal.com/* -f)
copyBuild=$(cp build/* -R /etc/nginx/www/dev.alirahal.com/);
changeOwner=$(chown nginx:nginx /etc/nginx/www/dev.alirahal.com/* -R);
restartNginx=$(service nginx reload);
echo $restartNginx;
echo -e "\n Done deploying new changes \n";