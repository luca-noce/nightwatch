# Nightwatch problem with Global afterEach

I have experienced weird behaviour when I try to use the After or Global AfterEach in my tests when I trigger more than one test, which leads to a second test to run before the previous one has completed. Here I want reproduce the problem with a minimal change on the the original code.

I have two tests, that are a copy of the \examples\tests\google\googleDemoTest.js, but I've moved the browser.end session in the Global AfterEach.
The reason why I'm trying to run this code is because I'd like to manage the end session in the Global afterEach, so I don't need to call browser.end in every testsuite and also because I want to add clean up logic in the afterEach.

The expected behaviour of the two tests is:

```sh
[Tests\google\google Demo Test] Test Suite
==========================================
global beforeEach
test #1 before
Running:  demo test google #1
 ? Element <body> was present after 27 milliseconds.
OK. 1 assertions passed. (1.895s)

Running:  part two #1
 ? Testing if element <#main> contains text: "Night Watch".
OK. 1 assertions passed. (2.269s)
test #1 after
global afterEach
**** global afterEach is completed ****

[Tests\google\google Demo Test2] Test Suite
===========================================
global beforeEach
test #2 before
Running:  demo test google #1
 ? Element <body> was present after 26 milliseconds.
OK. 1 assertions passed. (1.877s)
Running:  part two #2
 ? Testing if element <#main> contains text: "Night Watch".
OK. 1 assertions passed. (2.223s)
test #2 after
global afterEach
**** global afterEach is completed ****

OK. 4 total assertions passed. (8.643s)
global after
```

But the actual behaviour is this, note that the second tests starts before the globalAfterEach of the first completes:

```sh
[Tests\google\google Demo Test] Test Suite
==========================================
global beforeEach
test #1 before
Running:  demo test google #1
 ? Element <body> was present after 24 milliseconds.
OK. 1 assertions passed. (1.927s)
Running:  part two #1
 ? Testing if element <#main> contains text: "Night Watch".
OK. 1 assertions passed. (2.304s)
test #1 after
global afterEach

[Tests\google\google Demo Test2] Test Suite
===========================================
global beforeEach
test #2 before
Running:  demo test google #1
 ? Element <body> was present after 22 milliseconds.
OK. 1 assertions passed. (1.828s)
Running:  part two #2
**** global afterEach is completed ****
 ? Testing if element <#main> contains text: "Night Watch".
OK. 1 assertions passed. (2.182s)
test #2 after
global afterEach
OK. 4 total assertions passed. (8.606s)
global after
**** global afterEach is completed ****
```

Is this a bug? a temporary limitation?


### How to run the 2 tests

node nightwatch.js --tag luca

