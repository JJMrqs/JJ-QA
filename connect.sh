connect.sh
    case $1 in

    postgres)
        scp -i SDC.pem ./init.sh ec2-user@ec2-3-144-71-172.us-east-2.compute.amazonaws.com:~init.sh
        ssh -i SDC.pem ec2-user@ec2-3-144-71-172.us-east-2.compute.amazonaws.com
        ;;

    node)
        scp -i SDC.pem ./init.sh ec2-user@ec2-18-218-193-54.us-east-2.compute.amazonaws.com:~init.sh
        ssh -i SDC.pem ec2-user@ec2-18-218-193-54.us-east-2.compute.amazonaws.com
        ;;