const { connect_and_truncate, disconnect, benchmarkInsert, benchmarkInsertText, benchmarkSelectText, benchmarkSelect } = require('./benchmark-postgres');

const ITERATIONS = 5e4;
const DATA = {
  blockRID: '73A2CFDD82C7D37E03D381D7CAEDC4C85773A56586285311B52B9333CACB8629',
  blockHeight: 28162,
  blockHeader: {
    blockchainRid: 'C779478D9333BBE2A65C4A06A8322AAEA860C817985FDFB6C86EB019D5A285ED',
    prevBlockRid: '1DF895C2D87AAD348870E81E1385D4F425600B9BFA02A5D0D3D1698723A66E19',
    rootHash: 'CC397291F8FF7540EA128E93C2844A08426391221BA8FF31089CD88D6BFB3FA3',
    timestamp: new Date('2024-07-30T09:11:06.660Z'),
    height: 28162,
    dependencies: null,
    extra: {
      config_hash: 'C779478D9333BBE2A65C4A06A8322AAEA860C817985FDFB6C86EB019D5A285ED',
    },
  },
  witness:
    '00000001000000210324653EAC434488002CC06BBFB7F10FE18991E35F9FE4302DBEA6D2353DC0AB1C00000040A8DF38000FBB5645AF48A855269D57E40C74C2DA1BBFAD073DD6B0E99755B226226EDC85EA742B61CCBCBDE3C3FAC2648CB375FCA7657F4B42A047999EC84D99',
  timestamp: new Date('2024-07-30T09:11:06.660Z'),
  txRID: '1F62E04E575AC6704782A5357B9CA68A6F1CFCD5E8B2957DE75BE0A9CC0BD8C7',
  txHash: '62A6346B3EE186F1E43590850BBAD27FD7CECF8931BD86926DFB35DAA5A8120C',
  txData: {
    blockchainRid: 'C779478D9333BBE2A65C4A06A8322AAEA860C817985FDFB6C86EB019D5A285ED',
    operations: [
      {
        opName: 'dev.give_user_original',
        args: [
          '7511F76CAD8CCBF3FE4F7C2192F1D5580D0D42492B4FD2EE23DE2C965E2409A8',
          'equippable_elle_bracelet_croissant',
          'com.myneighboralice.IFungibleEquippable',
          1,
        ],
      },
      {
        opName: 'nop',
        args: [
          Buffer.from([
            8, 237, 198, 165, 213, 92, 215, 105, 172, 8, 87, 181, 216, 247, 130, 252, 113, 64, 221, 185, 158, 18,
            219, 38, 122, 174, 249, 145, 167, 4, 113, 153,
          ]),
        ],
      },
    ],
    signatures: [
      '44CB0A7A0F4EE12DFB66E3F01876B2762638EFFA8A283F4D1B3B63CB0F0BEFCA109BBDB7766851C9E88B283BA86AC4B745B629F781FF2BF3F8BAB837AA196793',
    ],
    signers: ['0289292263EE7C17295B4EB32D3EA3C67469757ED36B5F41950C978183A5ED4C2D'],
  },
}

async function runBenchmarks() {
  try {
    await connect_and_truncate();

    console.log(`Running benchmarks with ${ITERATIONS} iterations...`);

    // Insert benchmarks
    console.log('\nInsert Benchmarks:');
    console.log(`Text: ${await benchmarkInsertText('text_data', DATA, ITERATIONS)} seconds`);
    console.log(`JSON: ${await benchmarkInsert('json_data', DATA, ITERATIONS)} seconds`);
    console.log(`JSONB: ${await benchmarkInsert('jsonb_data', DATA, ITERATIONS)} seconds`);

    // Select benchmarks
    console.log('\nSelect Benchmarks:');
    console.log(`Text: ${await benchmarkSelectText('text_data', ITERATIONS)} seconds`);
    console.log(`JSON: ${await benchmarkSelect('json_data', ITERATIONS)} seconds`);
    console.log(`JSONB: ${await benchmarkSelect('jsonb_data', ITERATIONS)} seconds`);

  } catch (err) {
    console.error('Error running benchmarks:', err);
  } finally {
    await disconnect();
  }
}

runBenchmarks();