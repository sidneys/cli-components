
BUILD_DIR=build
SRC_DIR=src

all: .FORCE

.FORCE: clean build

build:
	tsc --project .
	cp ./src/d.ts/*.d.ts ./build/

clean:
	rm -rf build
