package main

/* // Generic Imports
#include<stdio.h>
#include<stdlib.h>
*/
import "C"
import (
	"io/ioutil"
	"log"
	"os"
	"regexp"
)

//export Decontraction
func Decontraction() int{
	file,err := ioutil.ReadFile("raw.txt")
	if err!=nil{
		log.Fatal("Unable to process")
		return 0
	}
	strs := string(file)

	for k, v := range Contractions{
		m1 := regexp.MustCompile(k)
		strs = m1.ReplaceAllString(strs, v)
	}

	ioutil.WriteFile("processed.txt", []byte(strs), os.FileMode(770))

	return 1
}

func main (){ }



