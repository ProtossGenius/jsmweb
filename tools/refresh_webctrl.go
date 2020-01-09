package main

import (
	"github.com/ProtossGenius/SureMoonNet/basis/smn_file"
	"strings"
	"fmt"
	"os"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	d, err := smn_file.FileReadAll("./datas/webctrl/list.txt")
	check(err)
	out := "./webobj/webctrl.js"
	err = smn_file.RemoveFileIfExist(out)
	check(err)
	f, err := os.Create(out)
	writeln := func(str string) {
		f.WriteString(str + "\n")
	}
	check(err)
	writeln(`var wo = require('./webobj');`)
	list := strings.Split(string(d), "\n")
	mp := map[string]bool{}
	for i := range list {
		list[i]  =strings.TrimSpace(list[i])
		if list[i] == ""{
			continue
		}
		if mp[list[i]]{
			continue
		}
		mp[list[i]] = true
		writeln(fmt.Sprintf(`
function %s(sons, attrib){
    return new wobj("%s", sons, attrib);
}`, list[i], list[i]))
	}
	writeln(`module.exports = {`)
	for line := range mp{
		writeln(fmt.Sprintf("%s:%s,", line, line))
	}
	writeln(`};`)
	f.Close()
}
