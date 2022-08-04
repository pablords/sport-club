#!/bin/bash



sed -i '/SPORT_CLUB_HOME/d' ~/.bashrc
sed -i '/alias dc-sc/d' ~/.bashrc

export SPORT_CLUB_HOME=~/sport-club


echo "adicionando variavel ambiente " $SPORT_CLUB_HOME


if [ $SHELL = "/bin/bash" ]; then
    echo "export SPORT_CLUB_HOME="$SPORT_CLUB_HOME>>~/.bashrc
    echo "export SPORT_CLUB_HOME="$SPORT_CLUB_HOME>>~/.profile
    echo "alias dc-sc='docker-compose -f $SPORT_CLUB_HOME/composes/docker-compose.yml'">>~/.bashrc
    echo "alias dc-sc='docker-compose -f $SPORT_CLUB_HOME/composes/docker-compose.yml'">>~/.profile
    source ~/.bashrc
    source ~/.profile
else
    echo "export SPORT_CLUB_HOME="$SPORT_CLUB_HOME>>~/.zshrc
    echo "export SPORT_CLUB_HOME="$SPORT_CLUB_HOME>>~/.profile
    echo "alias dc-sc='docker-compose -f $SPORT_CLUB_HOME/composes/docker-compose.yml'">>~/.zshrc
    echo "alias dc-sc='docker-compose -f $SPORT_CLUB_HOME/composes/docker-compose.yml'">>~/.profile
    source ~/.zshrc
    source ~/.profile
fi


mkdir $SPORT_CLUB_HOME

cp ./clone_repo.sh $SPORT_CLUB_HOME

cd $SPORT_CLUB_HOME

./clone_repo.sh

rm -rf clone_repo.sh