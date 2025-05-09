import { useAlert } from '@gear-js/react-hooks';
import { GenericTransactionReturn, TransactionReturn } from '@gear-js/react-hooks/dist/hooks/sails/types';
import { useEzTransactions } from 'gear-ez-transactions';
import { useCheckBalance } from './use-check-balance';


export type Options = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useSignAndSend = () => {
  const { signless, gasless } = useEzTransactions();

  const { checkBalance } = useCheckBalance({
    signlessPairVoucherId: signless.voucher?.id,
    gaslessVoucherId: gasless.voucherId,
  });

  const alert = useAlert();

  const signAndSend = async (
    transaction: TransactionReturn<() => GenericTransactionReturn<null>>,
    options?: Options,
  ) => {
    const { onSuccess, onError } = options || {};
    const calculatedGas = Number(transaction.extrinsic.args[2].toString());
    checkBalance(
      calculatedGas,
      async () => {
        try {
          const { response } = await transaction.signAndSend();
          await response();
          onSuccess?.();
        
        } catch (error) {
          onError?.();
          console.error(error);
          alert.error("Error");
        }
      },
      onError,
    );
  };

  return { signAndSend };
};
