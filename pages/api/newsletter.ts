import type { NextApiHandler } from 'next';
import { apolloClient } from '@/graphql/apolloClient';
import {
  AddMemberToNewsletterDocument,
  AddMemberToNewsletterMutation,
  AddMemberToNewsletterMutationVariables,
} from '@/generated/types-and-hooks';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).json({});
  }

  const { email } = req.body;

  if (typeof email !== 'string') {
    return res.status(400).json({});
  }

  //place for optional private keys from .env
  const PROJECT_AREA = process.env.PROJECT_AREA;
  if (!PROJECT_AREA) {
    return res.status(500).json({ error: 'Environment variable missing' });
  }

  const { errors, data } = await apolloClient.mutate<
    AddMemberToNewsletterMutation,
    AddMemberToNewsletterMutationVariables
  >({
    mutation: AddMemberToNewsletterDocument,
    variables: {
      memberData: { email, area: PROJECT_AREA },
    },
  });

  if (errors || !data) {
    return res.status(500).json({
      error: errors ? errors[0]?.message : 'server error',
    });
  }

  res.status(201).json({});
};

export default handler;
