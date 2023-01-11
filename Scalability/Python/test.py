# Authour: Uzile Mkhumbuzi
# Email: mkhuzi001@myuct.ac.za
# Date: Decemer 2022
# The program use the truffle test scritp "BechmarkTest.js" to deploy N threads to stess test the network

import threading
import os

def function_to_run_tool(data_sample):
    os.system("truffle test test/BechmarkTest.js --network uzzi &")

    # Change the command if you are using a different OS
    # The "--network uzzi" can be removed or configured to your own pricate blockchain
    # Locate or changethe command to so that "BechmarkTest.js" is correncly targerted
    # "BechmarkTest.js" is found in the respiratory test foldeer

if __name__ == "__main__":
    N = int(input("Enter the number of benchmark threads to use:\n"))
    
    for i in range (0,N):
        thread1 = threading.Thread(target=function_to_run_tool, args=(i,))
        thread1.start()
        print("Started Thread", i, "Has started")