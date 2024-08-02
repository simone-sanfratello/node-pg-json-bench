simone@workstation:~/code/pg-json-node-performance$ node index.js 
Running benchmarks with 1000 iterations...

Insert Benchmarks:
Text: 0.991596251 seconds
JSON: 0.968193422 seconds
JSONB: 0.972800277 seconds

Select Benchmarks:
Text: 0.116329585 seconds
JSON: 0.11229245 seconds
JSONB: 0.129354521 seconds
simone@workstation:~/code/pg-json-node-performance$ node index.js 
Running benchmarks with 10000 iterations...

Insert Benchmarks:
Text: 10.120018698 seconds
JSON: 9.666195335 seconds
JSONB: 10.646205435 seconds

Select Benchmarks:
Text: 1.027928497 seconds
JSON: 1.046532797 seconds
JSONB: 1.298733631 seconds
simone@workstation:~/code/pg-json-node-performance$ node index.js 
Running benchmarks with 30000 iterations...

Insert Benchmarks:
Text: 27.72751874 seconds
JSON: 27.850100631 seconds
JSONB: 31.699793281 seconds

Select Benchmarks:
Text: 3.24411381 seconds
JSON: 3.230309711 seconds
JSONB: 3.912353957 seconds
simone@workstation:~/code/pg-json-node-performance$ node index.js 
Running benchmarks with 50000 iterations...

Insert Benchmarks:
Text: 47.646984524 seconds
JSON: 48.716264979 seconds
JSONB: 52.555051718 seconds

Select Benchmarks:
Text: 5.478713444 seconds
JSON: 5.552235794 seconds
JSONB: 6.157957687 seconds
