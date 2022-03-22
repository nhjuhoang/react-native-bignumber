import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../../RootProps';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BN as FastBN } from 'react-native-bignumber';
import BN from 'bn.js';

function getTime(f: () => void): number {
  const before = global.performance.now();
  f();
  const after = global.performance.now();
  return after - before;
}

function cmp(f: () => void, g: () => void) {
  return getTime(g) - getTime(f);
}

function startBenchmarking() {
  const p = new FastBN(
    'ffffffff00000001000000000000000000000000ffffffffffffffffffffffff',
    16
  );
  const a = new FastBN(
    'e1d969b8192fbac73ea5b7921896d6a2263d4d4077bb8e5055361d1f7f8163f3',
    16
  );

  const pp = new BN(
    'ffffffff00000001000000000000000000000000ffffffffffffffffffffffff',
    16
  );
  const aa = new BN(
    'e1d969b8192fbac73ea5b7921896d6a2263d4d4077bb8e5055361d1f7f8163f3',
    16
  );

  {
    console.log('test multiply');
    let time = cmp(
      () => {
        a.mul(p);
      },
      () => {
        aa.mul(pp);
      }
    );
    console.log('test multiply - result: ' + time);
  }

  {
    console.log('test add');
    let time = cmp(
      () => {
        a.add(p);
      },
      () => {
        aa.add(pp);
      }
    );
    console.log('test add - result: ' + time);
  }

  {
    const tenFBN = new FastBN(10);
    const ten = new BN(10);
    console.log('test pow');
    let time = cmp(
      () => {
        a.pow(tenFBN);
      },
      () => {
        aa.pow(ten);
      }
    );
    console.log('test pow - result: ' + time);
  }

  {
    console.log('test div');
    let time = cmp(
      () => {
        p.div(a);
      },
      () => {
        pp.div(aa);
      }
    );
    console.log('test div - result: ' + time);
  }

  {
    console.log('test create two BN');
    let time = cmp(
      () => {
        const p = new FastBN(
          'ffffffff00000001000000000000000000000000ffffffffffffffffffffffff',
          16
        );
        const a = new FastBN(
          'e1d969b8192fbac73ea5b7921896d6a2263d4d4077bb8e5055361d1f7f8163f3',
          16
        );
      },
      () => {
        const p = new BN(
          'ffffffff00000001000000000000000000000000ffffffffffffffffffffffff',
          16
        );
        const a = new BN(
          'e1d969b8192fbac73ea5b7921896d6a2263d4d4077bb8e5055361d1f7f8163f3',
          16
        );
      }
    );
    console.log('test create two BN - result: ' + time);
  }
}

type BenchmarksProps = NativeStackScreenProps<RootStackParamList, 'Benchmarks'>;

export const Benchmarks: React.FC<BenchmarksProps> = () => {
  useEffect(() => {
    startBenchmarking();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Testing performance - You can see results in logs! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContext: 'center',
  },
});
