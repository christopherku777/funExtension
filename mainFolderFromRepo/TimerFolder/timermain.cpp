#include<iostream>
#include<thread>
#include<chrono>
#include<stdlib.h>
#include<unistd.h>

using namespace std;

void countdownFunction(int min){
    int sec = 0;
    while(min>=0){
        cout<<"\t"<<min<<" : "<<sec<<endl;
        this_thread::sleep_for(chrono::seconds(1));
        sec--;
       
        if (sec < 0){
            min--;
            sec = 59;
        }
    }
}

int main(){
    int workTimer = 25;
    int breakTimer = 5;
    cout<< "Work Timer" <<endl;
    countdownFunction(workTimer);

    cout<< "Break Timer" <<endl;
    countdownFunction(breakTimer);
    
    cout<< "DONE" <<endl;
    return 0;
}
